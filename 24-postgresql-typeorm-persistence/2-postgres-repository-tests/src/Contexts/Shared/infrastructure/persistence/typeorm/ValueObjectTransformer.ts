import { NewableClass } from "../../../domain/NewableClass"
import { ValueObject } from "../../../domain/value-object/ValueObject"
  
export const ValueObjectTransformer = (ValueObject: NewableClass<ValueObject<unknown>>) => {
  return {
    to: (value: ValueObject<unknown>): unknown => value.value,
    from: (value: unknown): ValueObject<unknown> => new ValueObject(value)
  }
}