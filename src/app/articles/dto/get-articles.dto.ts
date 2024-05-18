import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseGetListDto } from '../../../common/dto/base-get-list.dto';

export class GetArticlesDto extends BaseGetListDto {
  @Type(() => String)
  @IsOptional()
  uid: string;
}
