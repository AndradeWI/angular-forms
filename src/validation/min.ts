import { Validation, ValidationType } from '.';

export class Min extends Validation {

  public static fromJson(validation: Min): Min {
    return new Min(validation.message, validation.value);
  }

  public constructor(
    message: string,
    private _value: number
  ) {
    super(ValidationType.MIN, message);
  }

  public get value(): number {
    return this._value;
  }
}
