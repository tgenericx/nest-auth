import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType<'graphql'>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext<{ req: { user?: unknown } }>().req.user;
    }

    const req = context
      .switchToHttp()
      .getRequest<Request & { user?: unknown }>();
    return req.user;
  },
);
