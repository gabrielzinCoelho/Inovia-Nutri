import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'
import * as dayjs from 'dayjs'

export function IsAfterThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsAfterThan',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: {
        message:
          validationOptions?.message ??
          `${propertyName} must be after than ${property}`,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]

          const valueDate = dayjs(value)
          const relatedValueDate = dayjs(relatedValue)
          return (
            valueDate.isValid() &&
            relatedValueDate.isValid() &&
            (dayjs(value).isAfter(dayjs(relatedValue)) ||
              dayjs(value).isSame(dayjs(relatedValue)))
          )
        },
      },
    })
  }
}
