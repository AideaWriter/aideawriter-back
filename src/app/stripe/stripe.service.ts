import { Injectable } from '@nestjs/common';
import { StripePaymentService } from '../../infrastructure/stripe/stripe.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { CancelAtPeriodEndDto } from './dto/cancel-at-period-end.dto';


@Injectable()
export class StripeService {

  constructor(
    private stripePaymentService: StripePaymentService,
  ) {
  }

  async getCustomer(uid: string) {
    return this.stripePaymentService.getCustomer(uid);
  }

  async createCustomer(uid: string, createCustomerDto: CreateCustomerDto) {
    return this.stripePaymentService.createCustomer(uid, createCustomerDto);
  }

  async deleteCustomer(uid: string) {
    return this.stripePaymentService.deleteCustomer(uid);
  }

  async getSubscription(uid: string) {
    return this.stripePaymentService.getSubscription(uid);
  }

  async checkingSubscriptionStatus() {
    return this.stripePaymentService.checkingSubscriptionStatus();
  }

  async cancelSubscription(uid: string) {
    return this.stripePaymentService.cancelSubscription(uid);
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    return this.stripePaymentService.createSubscription(createSubscriptionDto);
  }


  async getCanceledSubscriptions() {
    return this.stripePaymentService.getCanceledSubscriptions();
  }

  async createPaymentMethod(uid: string) {
    return this.stripePaymentService.createPaymentMethod(uid);
  }

  async getListPaymentMethod(uid: string) {
    return this.stripePaymentService.getListPaymentMethod(uid);
  }

  async updatePaymentMethod(dto: UpdatePaymentMethodDto) {
    return this.stripePaymentService.updatePaymentMethod(dto);
  }

  async createCheckoutSession(uid: string, createCheckoutSessionDto: CreateCheckoutSessionDto) {
    return this.stripePaymentService.createCheckoutSession(uid, createCheckoutSessionDto);
  }

  async cancelAtPeriodEnd(uid: string, dto: CancelAtPeriodEndDto) {
    return this.stripePaymentService.cancelAtPeriodEnd(uid, dto);
  }

  async getListInvoices(uid: string) {
    return this.stripePaymentService.getListInvoices(uid);
  }


}
