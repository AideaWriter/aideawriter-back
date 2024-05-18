import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserActivityInterceptor implements NestInterceptor {
  constructor(private eventEmitter: EventEmitter2) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const args = context.getArgs();

        if (!args?.[0]?.user) {
          return;
        }

        if (args[0].originalUrl === '/auth/login') {
          this.eventEmitter.emit('activity.login', {
            id: args?.[0]?.user?.id,
          });

          return;
        }

        this.eventEmitter.emit('activity.action', {
          id: args?.[0]?.user?.id,
        });
      }),
    );
  }
}
