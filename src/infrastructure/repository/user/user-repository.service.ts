import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../../app/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import config from '../../../config/index';
import { left, right } from '@sweet-monads/either';
import { AppError } from '../../../common/error/app-error';
import { ChangeCustomerIdDto } from '../../../app/user/dto/change-customerId.dto';
import { ChangePaymentMethodIdDto } from '../../../app/user/dto/change-payment-method-id.dto';
import { CheckoutSessionIdDto } from '../../../app/user/dto/checkout-session-id.dto';
import { ChangeStatusDto } from '../../../app/user/dto/change-status.dto';
import { ChangeSubscriptionDto } from '../../../app/user/dto/change-subscription.dto';
import { ChangeDataSubscriptionDto } from '../../../app/user/dto/change-data-subscription.dto';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
  }


  async checkIfUsersExistsByEmailAndUid(email: string | undefined, uid: string | undefined) {
    if (email === undefined || uid === undefined) {
      return false;
    }
    const user = await this.userRepository.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .andWhere('user.uid != :uid', { uid })
      .getOne();
    return !!user;
  }

  async checkIfUsersExistsByEmail(email: string | undefined) {
    if (email === undefined) {
      return false;
    }
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return !!user;
  }


  async create(data) {
    if (data.password) {
      data.password = await bcrypt.hash(
        data.password,
        config.hashSalt,
      );
    }
    data.uid = uuidv4();
    return this.userRepository.save(data);

  }

  async findAll(data) {
    try {
      // const page = parseInt(data.page, 10);
      // const limit = parseInt(data.limit, 10);

      const [results, total] = await this.userRepository.find();
      return right([results, total]);
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }


  async findByUid(uid: string) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // async findByUid(uid: string) {
  //   try {
  //     const user = await this.userRepository.findOne({ where: { uid: uid } });
  //     if (!user) {
  //       return left(new AppError('User not found'));
  //     }
  //     return right(user);
  //   } catch (err) {
  //     return left(new AppError(`${err.message}`));
  //   }
  // }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async update(uid: string, dto) {
    try {
      const user = await this.userRepository.findOne({ where: { uid: uid } });
      if (!user) {
        return left(new AppError('User not found'));
      }
      if (dto.password) {
        dto.password = await bcrypt.hash(
          dto.password,
          config.hashSalt,
        );
      }
      const mergedProvider = this.userRepository.merge(user, dto);
      return right(this.userRepository.save(mergedProvider));
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }

  async remove(uid: string) {
    try {
      const user = await this.userRepository.findOne({ where: { uid: uid } });
      if (!user) {
        return left(new AppError('User not found'));
      }
      await this.userRepository.delete(user.id);
      return right({ success: true });
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }


  async changePasswordToken(uid: string, data) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const mergedUser = this.userRepository.merge(user, data);
    return this.userRepository.save(mergedUser);
  }

  async changePassword(uid: string, data) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (data.password) {
      data.password = await bcrypt.hash(
        data.password,
        config.hashSalt,
      );
    }
    const mergedUser = this.userRepository.merge(user, data);
    await this.userRepository.save(mergedUser);
    return { message: 'Password has been changed' };
  }

  async changeCustomerId(uid: string, dto: ChangeCustomerIdDto) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const mergedProvider = this.userRepository.merge(user, dto);
    return this.userRepository.save(mergedProvider);
  }

  async changeStatus(uid: string, dto: ChangeStatusDto) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const mergedProvider = this.userRepository.merge(user, dto);
    return this.userRepository.save(mergedProvider);
  }

  async changeCheckoutSessionId(uid: string, dto: CheckoutSessionIdDto) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const mergedProvider = this.userRepository.merge(user, dto);
    return this.userRepository.save(mergedProvider);
  }

  async findByCheckoutSessionId(dto: CheckoutSessionIdDto) {
    const user = await this.userRepository.findOne({
      where: { checkout_session_id: dto.checkout_session_id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findBySubscriptionId(dto: ChangeSubscriptionDto) {
    const user = await this.userRepository.findOne({
      where: { billing_subscription_id: dto.billing_subscription_id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async changeSubscriptionId(uid: string, dto: ChangeSubscriptionDto) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const mergedProvider = this.userRepository.merge(user, dto);
    return this.userRepository.save(mergedProvider);
  }

  async changeDataSubscription(uid: string, dto: ChangeDataSubscriptionDto) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const mergedProvider = this.userRepository.merge(user, dto);
    return this.userRepository.save(mergedProvider);
  }

  async changePaymentMethodId(uid: string, dto: ChangePaymentMethodIdDto) {
    const user = await this.userRepository.findOne({ where: { uid: uid } });
    if (!user) {
      throw new NotFoundException('Provider not found');
    }
    const mergedProvider = this.userRepository.merge(user, dto);
    return this.userRepository.save(mergedProvider);
  }

}
