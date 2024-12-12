import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TokenPayloadDto } from './jwt-strategy'

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.user as TokenPayloadDto
  },
)
