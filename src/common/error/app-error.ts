export class AppError {
  private code: string;
  private message: string | string[];

  constructor(message: string | string[]) {
    this.message = message;
    this.getErrorCode();
  }

  private getErrorCode() {
    const tempError = new Error();

    const stack = tempError.stack;
    const stackLine = stack?.split?.('\n')?.[3]?.trim?.() || '';
    this.code = stackLine?.split?.(' ')?.[1] || 'unknown';
  }
}
