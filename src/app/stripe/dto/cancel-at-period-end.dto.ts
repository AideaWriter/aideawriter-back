import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CancelAtPeriodEndDto {
  @IsNotEmpty()
  @IsBoolean()
  cancel_at_period_end: boolean;
}
