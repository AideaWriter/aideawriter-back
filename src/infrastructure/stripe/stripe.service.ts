import { Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../app/user/entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import config from '../../config';
import { UserRepositoryService } from '../repository/user/user-repository.service';
import { CreateCustomerDto } from '../../app/stripe/dto/create-customer.dto';
import { CreateSubscriptionDto } from '../../app/stripe/dto/create-subscription.dto';
import { UpdatePaymentMethodDto } from '../../app/stripe/dto/update-payment-method.dto';
import { CreateCheckoutSessionDto } from '../../app/stripe/dto/create-checkout-session.dto';
import { CancelAtPeriodEndDto } from '../../app/stripe/dto/cancel-at-period-end.dto';

@Injectable()
export class StripePaymentService {
  private stripe: Stripe;

  constructor(
    private userRepositoryService: UserRepositoryService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
    this.stripe = new Stripe(`${config.stripeSecretKey}`, {
      apiVersion: '2024-04-10'
    });
  }


  async getCustomer(uid: string) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.billing_customer_id == undefined) {
      throw new NotFoundException('Billing subscription id is undefined');
    }
    return this.stripe.customers.retrieve(user.billing_customer_id);
  }


  async createCustomer(uid: string, createCustomerDto: CreateCustomerDto) {
    const customerId = await this.stripe.customers.create(createCustomerDto);
    if (!customerId) {
      throw new NotFoundException('Customer id was not created');
    }
    await this.userRepositoryService.changeCustomerId(uid, { billing_customer_id: customerId.id });
    return customerId;
  }

  async deleteCustomer(uid: string) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.billing_customer_id == undefined) {
      throw new NotFoundException('Billing subscription id is undefined');
    }
    return this.stripe.customers.del(user.billing_customer_id);
  }

  async getSubscription(uid: string) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.stripe.subscriptions.retrieve(`${user.billing_subscription_id}`);
  }

  async checkingSubscriptionStatus() {
    const users = await this.userRepository.find({
      where: { billing_subscription_id: Not(IsNull()) }
    });
    const subscriptions = await Promise.all(
      users.map(user =>
        this.stripe.subscriptions.retrieve(user.billing_subscription_id)
          .catch(err => {
            console.error(`Error retrieving subscription for user ${user.id}:`, err);
            return null;  // Возвращаем null в случае ошибки, чтобы не прерывать всю операцию
          })
      )
    );

    subscriptions.map(async subscription => {
      let todayDate = moment().format('MM/DD/YYYY/hh/mm');
      let endDate = moment.unix(subscription.current_period_end).format('MM/DD/YYYY/hh/mm');
      console.log(todayDate, endDate);
      if (endDate === todayDate) {
        const userData = await this.userRepository.findOne({ where: { billing_subscription_id: subscription.id } });

        if (!userData) {
          throw new NotFoundException('User not found');
        }

        const mergedUser = this.userRepository.merge(userData, { billing_status: 'Free' });
        await this.userRepository.save(mergedUser);
      }
    });
    // return this.stripe.subscriptions.list();
  }


  async cancelSubscription(uid: string) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.billing_subscription_id == undefined) {
      throw new NotFoundException('Billing subscription id is undefined');
    }
    return this.stripe.subscriptions.cancel(user.billing_subscription_id);
  }


  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    return this.stripe.subscriptions.create({
      customer: createSubscriptionDto.customer_id,
      items: [{ price: createSubscriptionDto.price_id }],
    });
  }

  async getCanceledSubscriptions() {
    return this.stripe.subscriptions.list({
      status: 'canceled',
    });
  }

  async createPaymentMethod(uid: string) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.stripe.paymentMethods.create({
      customer: user.billing_customer_id,
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 8,
        exp_year: 2026,
        cvc: '314',
      },
    });

  }

  async getListPaymentMethod(uid: string) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.stripe.customers.listPaymentMethods(
      user.billing_customer_id,
      {
        limit: 3,
      }
    );
  }


  async updatePaymentMethod(dto: UpdatePaymentMethodDto) {
    await this.stripe.paymentMethods.detach(dto.payment_method_id);
    return this.stripe.setupIntents.create({
      customer: dto.billing_customer_id,
    });
  }

  async createCheckoutSession(uid: string, createCheckoutSessionDto: CreateCheckoutSessionDto) {
    // await this.stripe.invoices.create({ customer: customer.billing_customer_id });
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) throw new NotFoundException('User not found');


    let sessionParam: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: createCheckoutSessionDto.price_id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: createCheckoutSessionDto.success_url,
      cancel_url: createCheckoutSessionDto.cancel_url,
    };
    const customer = 'customer';
    if (user.billing_customer_id !== null) sessionParam[customer] = user.billing_customer_id;

    console.log(user.billing_customer_id === null);
    const session = await this.stripe.checkout.sessions.create(sessionParam);
    // await this.stripe.invoices.create({ customer: customer.billing_customer_id });
    await this.userRepositoryService.changeCheckoutSessionId(uid, { checkout_session_id: session.id });

    return session;
  }

  async cancelAtPeriodEnd(uid: string, dto: CancelAtPeriodEndDto) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.stripe.subscriptions.update(user.billing_subscription_id, {
      cancel_at_period_end: dto.cancel_at_period_end
    });
  }

  async getListInvoices(uid: string) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(user);
    return this.stripe.invoices.list({
      customer: user.billing_customer_id,
    });
  }

  // async webhook(req: any) {
  //
  //   let event: Stripe.Event;
  //
  //   const payload = req.body;
  //   const sig = req.headers['stripe-signature'];
  //   console.log(process.env.STRIPE_WEBHOOK_SECRET);
  //   try {
  //     event = this.stripe.webhooks.constructEvent(
  //       `${payload}`,
  //       sig,
  //       'whsec_c68dfe427b23848565891f03fb313523b3af97f2f70050e33f18b660d4faff61'
  //     );
  //   } catch (err: any) {
  //     console.log(`Webhook Error:  ${err.message}`);
  //     throw new NotFoundException(`${err.message}`);
  //   }
  //   console.log(payload);
  //   // switch (event.type) {
  //   //   case 'checkout.session.completed':
  //   //     const session = event.data.object as Stripe.Checkout.Session;
  //   //     const customer = session.customer;
  //   //     const subscription = session.subscription;
  //   //     console.log(session.id, customer, subscription);
  //   //     // const user = await this.userRepository.findOne({ where: { billing_customer_id: customer.id } });
  //   //     // if (!user) {
  //   //     //   throw new NotFoundException('User not found');
  //   //     // } else {
  //   //     //   const mergedProvider = this.userRepository.merge(user, { billing_status: subscription.status });
  //   //     //   await this.userRepository.save(mergedProvider);
  //   //     // }
  //   //     break;
  //   //   default:
  //   //     console.log(`Unhandled event type ${event.type}`);
  //   // }
  //   return { received: true };
  // }
}
