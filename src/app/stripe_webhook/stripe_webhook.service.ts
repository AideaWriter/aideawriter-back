import { Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import * as moment from 'moment';
import { UserService } from '../user/user.service';

@Injectable()
export class StripeWebhookService {

  private stripe: Stripe;


  constructor(
    private readonly userService: UserService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });
  }

  async handleWebhook(req: any, res: any) {

    let event: Stripe.Event;

    try {
      // const sig = req.headers['stripe-signature'];

      const payload = req.body;

      const payloadString = JSON.stringify(payload, null, 2);
      const secret = process.env.STRIPE_WEBHOOK_SECRET;

      const header = this.stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
      });
      // console.log(sig);
      event = this.stripe.webhooks.constructEvent(
        payloadString,
        header,
        process.env.STRIPE_WEBHOOK_SECRET
      );


      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;
          const customer = session.customer;
          const subscription = session.subscription;
          const user = await this.userService.findByCheckoutSessionId({ checkout_session_id: session.id });
          const subCancel = await this.stripe.subscriptions.cancel(user.billing_subscription_id);
          console.log(subCancel);
          let totalToken;
          let billingStatus;
          if (session.amount_total === 1500) {
            billingStatus = 'Pro';
            totalToken = (+user.articles) + 10;
          } else if (session.amount_total === 2500) {
            billingStatus = 'Pro +';
            totalToken = (+user.articles) + 20;
          }


          // let totalToken = (+user.articles) + 10;
          let updateData = {
            billing_status: billingStatus,
            articles: totalToken
          };
          await this.userService.changeStatus(user.uid, updateData);
          if (user.billing_customer_id === null) await this.userService.changeCustomerId(user.uid, { billing_customer_id: `${customer}` });
          await this.userService.changeSubscriptionId(user.uid, { billing_subscription_id: `${subscription}` });
          if (subscription) {
            let sub = await this.stripe.subscriptions.retrieve(`${subscription}`);
            let start = moment.unix(sub.current_period_start).format('MM.DD.YYYY');
            let end = moment.unix(sub.current_period_end).format('MM.DD.YYYY');

            await this.userService.changeDataSubscription(user.uid, { start_sub: `${start}`, end_sub: `${end}` });
          }
          break;
        case 'customer.subscription.updated' :
          const subscriptionUpdate = event.data.object as Stripe.Subscription;
          const userSub = await this.userService.findBySubscriptionId({ billing_subscription_id: subscriptionUpdate.id });
          let amount = subscriptionUpdate.items.data[0].plan.amount;
          if (amount === 1500) {
            billingStatus = 'Pro';
            totalToken = (+userSub.articles) + 10;
          } else if (amount === 2500) {
            billingStatus = 'Pro +';
            totalToken = (+userSub.articles) + 20;
          }
          let updateDataSub = {
            billing_status: billingStatus,
            articles: totalToken
          };
          await this.userService.changeStatus(userSub.uid, updateDataSub);
          // const customer = session.customer;
          // const subscription = session;
          let start = moment.unix(subscriptionUpdate.current_period_start).format('MM.DD.YYYY');
          let end = moment.unix(subscriptionUpdate.current_period_end).format('MM.DD.YYYY');
          await this.userService.changeDataSubscription(userSub.uid, { start_sub: `${start}`, end_sub: `${end}` });
          // console.log(subscriptionUpdate.items.data[0].plan.amount);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }


      console.log('Webhook worked');
      res.status(200).end();
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      throw new NotFoundException(`Webhook Error: ${err.message}`);
    }
  }
}
