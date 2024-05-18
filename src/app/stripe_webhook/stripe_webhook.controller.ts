import { Controller, Header, Post, Req, Res } from '@nestjs/common';
import { StripeWebhookService } from './stripe_webhook.service';

@Controller('stripe-webhook')
export class StripeWebhookController {
  constructor(
    private stripeWebhookService: StripeWebhookService,
  ) {
  }

  @Post('webhook')
  @Header('Content-Type', 'application/json')
  async handleWebhook(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.stripeWebhookService.handleWebhook(req, res);
  }
}
