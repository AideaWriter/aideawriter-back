// import { Injectable } from '@nestjs/common';
//
// import * as SendGridMail from '@sendgrid/mail';
// import { left, right } from '@sweet-monads/either';
// import { AppError } from '../../../common/error/app-error';
// import config from '../../../config';
//
// @Injectable()
// export class SendgridService {
//   readonly sendgridApiKey: string;
//
//   constructor() {
//     if (!config.sendgridApiKey) {
//       throw new Error('SENDGRID_API_KEY is not found in .env file');
//     }
//
//     this.sendgridApiKey = config.sendgridApiKey;
//     SendGridMail.setApiKey(this.sendgridApiKey);
//   }
//
//   public async sendEmail({
//                            from,
//                            to,
//                            subject,
//                            text,
//                            html,
//                          }: {
//     from: string;
//     to: string;
//     subject: string;
//     text: string;
//     html: string;
//   }) {
//     const data = {
//       to,
//       from,
//       subject,
//       text,
//       html,
//     };
//     try {
//       const sendgridResult = await SendGridMail.send(data);
//       return right(sendgridResult);
//     } catch (err) {
//       const bodyMessages =
//         err?.response?.body?.errors
//           ?.map((error) => error.message || null)
//           .filter((value) => value) || [];
//
//       return left(
//         new AppError(
//           bodyMessages?.length
//             ? bodyMessages
//             : err.message || 'Sendgrid send email error',
//         ),
//       );
//     }
//   }
// }
