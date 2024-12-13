import { registerDecorator, ValidationOptions } from '@nestjs/class-validator'
import { isValidObjectId } from 'mongoose'

export function IsValidObjectId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidObjectId',
      target: object.constructor,
      propertyName,
      options: {
        message: validationOptions?.message ?? 'Invalid ObjectId format.',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return isValidObjectId(value)
        },
      },
    })
  }
}
