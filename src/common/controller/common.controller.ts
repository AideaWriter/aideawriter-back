import { isEither } from '@sweet-monads/either';
import { BadRequestException } from '@nestjs/common';

export class CommonController {
  protected handleEitherResultHttp(eitherResult, message = 'Error: ERROR') {
    // TODO decide how to handle not either results
    if (!isEither(eitherResult)) {
      console.log('===== WARNING: This result is not Either =====');
      return eitherResult;
    }

    eitherResult.mapLeft((errorValue: { code: string; message: string }) => {
      throw new BadRequestException(errorValue?.message || message, {
        cause: new Error(),
        description: errorValue.code,
      });
    });

    return eitherResult.unwrap();
  }
}
