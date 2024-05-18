import { Injectable } from '@nestjs/common';
import handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
// import * as FormData from 'form-data';
// import Mailgun from 'mailgun.js';
import { google } from 'googleapis';

const nodemailer = require('nodemailer');

@Injectable()
export class MailgunService {
  private compiledTemplates: Record<string, HandlebarsTemplateDelegate<any>> = {};

  constructor() {

    this.initializeTemplates();
  }


  async sendEmailTest(to: string, subject: string, templateName: string, emailData: Record<string, any>): Promise<void> {

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
    const { token } = await oAuth2Client.getAccessToken();


    const compiledTemplate = this.compiledTemplates[templateName];
    if (!compiledTemplate) {
      throw new Error(`Template "${templateName}" not found.`);
    }
    const html = compiledTemplate(emailData);

    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_FROM,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: token,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });


    transport.sendMail({
      from: process.env.MAIL_FROM || '',
      to,
      subject: 'Reset password in AIdeawriter',
      html,
    });
  }

  private initializeTemplates(): void {
    const templateDir = 'src/infrastructure/email-api/mailgun/templates';
    const templateFiles = fs.readdirSync(templateDir);

    templateFiles.forEach(file => {
      const templatePath = path.join(templateDir, file);
      const templateName = path.basename(file, path.extname(file));
      const template = fs.readFileSync(templatePath, 'utf8');
      this.compiledTemplates[templateName] = handlebars.compile(template);
    });
  }


}
