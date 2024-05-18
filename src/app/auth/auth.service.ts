import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepositoryService } from '../../infrastructure/repository/user/user-repository.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailgunService } from '../../infrastructure/email-api/mailgun/mailgun.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepositoryService,
    private jwtService: JwtService,
    private mailService: MailgunService,
  ) {
  }

  private static async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    return bcrypt
      .compare(plainTextPassword, hashedPassword)
      .then((validPass) => {
        return validPass;
        // validPass returns true or false
      })
      .catch((err) => {
        console.log('error: ' + err);
        return null;
      });
  }

  async validateProvider(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (await AuthService.verifyPassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: any) {
    const user = {
      uid: data.user.uid,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
    };
    return {
      user: data.user,
      token: this.jwtService.sign(user),
    };
  }

  async register(data) {
    const response = await this.userRepository.create(data);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }

  decodeToken(token): any {
    return this.jwtService.decode(token);
  }

  // async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
  //   const user = await this.userRepository.findByEmail(forgotPasswordDto.email);
  //   const userDataByToken = {
  //     uid: user.uid,
  //     email: forgotPasswordDto.email,
  //     role: user.role,
  //   };
  //   const token = this.jwtService.sign(userDataByToken);
  //   const forgotLink = `${config.clientAppUrl}/auth/forgot-password?token=${token}`;
  //   const saveToken = { change_password_token: `${token}` };
  //
  //   await this.userRepository.changePasswordToken(user.uid, saveToken);
  //
  //   const dataEmail = {
  //     from: 'arsenbabraev@gmail.com',
  //     to: forgotPasswordDto.email,
  //     subject: 'Change password message',
  //     text: 'This message will help you change your password using the link',
  //     html: `<p>This is link for change password ${forgotLink}</p>`
  //   };
  //
  //   // await this.mailService.sendEmail(dataEmail);
  //   return { message: 'Message sent successfully' };
  // }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userRepository.findByEmail(forgotPasswordDto.email);
    const userDataByToken = {
      uid: user.uid,
      email: forgotPasswordDto.email,
      role: user.role,
    };
    const token = this.jwtService.sign(userDataByToken);
    const forgotLink = `${process.env.CLIENT_URL}/pages/auth/reset-password?token=${token}`;
    const saveToken = { change_password_token: `${token}` };
    await this.userRepository.changePasswordToken(user.uid, saveToken);

    await this.mailService.sendEmailTest(
      forgotPasswordDto.email,
      'Logo password recovery test',
      'reset-password',
      {
        username: user.name,
        resetLink: forgotLink,
      },
    );
    return { message: 'Message sent successfully' };
  }
}
