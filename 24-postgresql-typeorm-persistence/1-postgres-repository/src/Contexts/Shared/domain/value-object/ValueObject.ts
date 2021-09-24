export abstract class ValueObject<T> {
  readonly value: T;
  
  constructor(value: T) {
    this.value = value;
  }

  public equals(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value;
  }
    
  public toString(): string {
    return JSON.stringify(this);
  }
}