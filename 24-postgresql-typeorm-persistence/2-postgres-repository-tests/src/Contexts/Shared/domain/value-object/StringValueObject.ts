import { ValueObject } from "./ValueObject";

export abstract class StringValueObject extends ValueObject<string> {
  toString(): string {
    return this.value;
  }
}