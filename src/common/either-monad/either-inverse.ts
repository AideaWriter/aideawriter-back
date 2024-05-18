import { isEither, left, right } from '@sweet-monads/either';
import { AppError } from '../error/app-error';

export const eitherInverse = (either, appError: AppError) => {
  if (!isEither(either)) {
    console.log('===== WARNING: This result is not Either =====');
    return either;
  }

  let reversedEither;

  either.mapRight(() => {
    reversedEither = left(appError);
  });

  either.mapLeft(() => {
    reversedEither = right(true);
  });

  return reversedEither;
};
