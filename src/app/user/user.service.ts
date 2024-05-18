import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from '../../infrastructure/repository/user/user-repository.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/channge-password.dto';
import { ChangePaymentMethodIdDto } from './dto/change-payment-method-id.dto';
import { CheckoutSessionIdDto } from './dto/checkout-session-id.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { ChangeSubscriptionDto } from './dto/change-subscription.dto';
import { ChangeCustomerIdDto } from './dto/change-customerId.dto';
import { ChangeDataSubscriptionDto } from './dto/change-data-subscription.dto';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class UserService {
  constructor(
    private userRepositoryService: UserRepositoryService,
    private stripeService: StripeService
  ) {
  }

  async create(dto: CreateUserDto) {
    return this.userRepositoryService.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
  }

  async findAll(dto: GetUserDto) {
    return this.userRepositoryService.findAll(dto);
  }

  async findByUid(uid: string) {
    return this.userRepositoryService.findByUid(uid);
  }

  async update(uid: string, dto: UpdateUserDto) {
    return this.userRepositoryService.update(uid, dto);
  }

  async remove(uid: string) {
    await this.stripeService.deleteCustomer(uid);
    return this.userRepositoryService.remove(uid);
  }

  async changePassword(uid: string, dto: ChangePasswordDto) {
    return this.userRepositoryService.changePassword(uid, dto);
  }

  async changePaymentMethodId(uid: string, dto: ChangePaymentMethodIdDto) {
    return this.userRepositoryService.changePaymentMethodId(uid, dto);
  }

  async findByCheckoutSessionId(dto: CheckoutSessionIdDto) {
    return this.userRepositoryService.findByCheckoutSessionId(dto);
  }

  async findBySubscriptionId(dto: ChangeSubscriptionDto) {
    return this.userRepositoryService.findBySubscriptionId(dto);
  }

  async changeStatus(uid: string, dto: ChangeStatusDto) {
    return this.userRepositoryService.changeStatus(uid, dto);
  }

  async changeSubscriptionId(uid: string, dto: ChangeSubscriptionDto) {
    return this.userRepositoryService.changeSubscriptionId(uid, dto);
  }

  async changeDataSubscription(uid: string, dto: ChangeDataSubscriptionDto) {
    return this.userRepositoryService.changeDataSubscription(uid, dto);
  }

  async changeCustomerId(uid: string, dto: ChangeCustomerIdDto) {
    return this.userRepositoryService.changeCustomerId(uid, dto);
  }
}
