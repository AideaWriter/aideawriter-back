import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StripeService } from './stripe.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { StripePaymentService } from '../../infrastructure/stripe/stripe.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { UserService } from '../user/user.service';
import { CancelAtPeriodEndDto } from './dto/cancel-at-period-end.dto';


@Controller('stripe')
@UseGuards(JwtGuard)
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly stripePaymentService: StripePaymentService,
    private readonly userService: UserService,
  ) {
  }

  @Post(':uid/create-customer')
  async createCustomer(@Param('uid') uid: string, @Body() createCustomerDto: CreateCustomerDto) {
    return this.stripeService.createCustomer(uid, createCustomerDto);
  }


  @Get(':uid/get-customer')
  async getCustomer(@Param('uid') uid: string) {
    return this.stripeService.getCustomer(uid);
  }

  @Get(':uid/get-subscription')
  async getSubscription(@Param('uid') uid: string) {
    return this.stripeService.getSubscription(uid);
  }

  @Cron('0 0 * * *')
  async checkingSubscriptionStatus() {
    console.log('This task runs every 24 hours at midnight');
    return this.stripeService.checkingSubscriptionStatus();
  }

  @Post('/create-subscription')
  async createSubscription(@Body() dto: CreateSubscriptionDto) {
    return this.stripeService.createSubscription(dto);
  }

  @Post(':uid/create-checkout-session')
  async createCheckoutSession(@Param('uid') uid: string, @Body() createCheckoutSessionDto: CreateCheckoutSessionDto) {
    // console.log(uid);
    return this.stripeService.createCheckoutSession(uid, createCheckoutSessionDto);
  }

  @Post(':uid/create-payment-method')
  async createPaymentMethod(@Param('uid') uid: string) {
    const paymentMethodId = await this.stripeService.createPaymentMethod(uid);
    let paymentMethod;
    // if (paymentMethodId.payment_method === null) {
    //   paymentMethodId.payment_method = 'No id payment method';
    // }
    paymentMethod = { payment_method_id: paymentMethodId.id };
    await this.userService.changePaymentMethodId(uid, paymentMethod);
    return paymentMethodId;
  }

  @Post(':uid/cancel-at-period-end')
  async cancelAtPeriodEnd(@Param('uid') uid: string, @Body() dto: CancelAtPeriodEndDto) {
    return this.stripeService.cancelAtPeriodEnd(uid, dto);
  }

  @Get(':uid/get-list-payment-method')
  async getListPaymentMethod(@Param('uid') uid: string) {
    return this.stripeService.getListPaymentMethod(uid);
  }


  @Get('/get-canceled-subscriptions')
  async getCanceledSubscriptions() {
    return this.stripeService.getCanceledSubscriptions();
  }


  @Patch(':uid/update-payment-method')
  async updatePaymentMethod(@Param() uid: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const paymentMethodId = await this.stripeService.updatePaymentMethod(updatePaymentMethodDto);
    let paymentMethod;
    if (paymentMethodId.payment_method === null) {
      paymentMethodId.payment_method = 'No id payment method';
    }
    paymentMethod = { payment_method_id: paymentMethodId.payment_method };
    await this.userService.changePaymentMethodId(uid, paymentMethod);
    return paymentMethodId;
  }

  @Delete(':uid/cancel-subscription')
  async cancelSubscription(@Param('uid') uid: string) {
    return this.stripeService.cancelSubscription(uid);
  }

  @Get(':uid/get-list-invoices')
  async getListInvoices(@Param('uid') uid: string) {
    return this.stripeService.getListInvoices(uid);
  }


  // @Post('/webhook')
  // @Header('Content-Type', 'application/json')
  // async handleWebhook(@Req() req: Request) {
  //   return this.stripePaymentService.webhook(req);
  // }
}
