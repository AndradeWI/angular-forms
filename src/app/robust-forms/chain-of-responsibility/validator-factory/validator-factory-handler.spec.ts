import {
  ValidatorFactoryHandler, RequiredValidator, EmailValidator, MaxValidator, MinValidator,
  MaxLengthValidator, MinLengthValidator, PatternValidator
} from '.';
import { ValidationTypeNotFoundError } from './error';
import { Validation, Email, Max, Min, MaxLength, MinLength, Pattern, Required } from '../../validation';

describe('RobustForms :: ChainOfResponsibility :: ValidatorFactory', () => {
  let validatorFactoryHandler: ValidatorFactoryHandler;

  beforeAll(() => {
    this.validatorFactoryHandler = new RequiredValidator();
    this.validatorFactoryHandler.append(new EmailValidator());
    this.validatorFactoryHandler.append(new MaxValidator());
    this.validatorFactoryHandler.append(new MinValidator());
    this.validatorFactoryHandler.append(new MaxLengthValidator());
    this.validatorFactoryHandler.append(new MinLengthValidator());
    this.validatorFactoryHandler.append(new PatternValidator());
  });

  it('should create a Email Validator', () => {
    const validation: Validation = new Email('email', 'Message');

    expect(this.validatorFactoryHandler.handle(validation)).toBeTruthy();
  });

  it('should create a Max Validator', () => {
    const validation: Validation = new Max('max', 'Message', 10);

    expect(this.validatorFactoryHandler.handle(validation)).toBeTruthy();
  });

  it('should create a Min Validator', () => {
    const validation: Validation = new Min('min', 'Message', 6);

    expect(this.validatorFactoryHandler.handle(validation)).toBeTruthy();
  });

  it('should create a MaxLength Validator', () => {
    const validation: Validation = new MaxLength('maxlength', 'Message', 6);

    expect(this.validatorFactoryHandler.handle(validation)).toBeTruthy();
  });

  it('should create a MinLength Validator', () => {
    const validation: Validation = new MinLength('minlength', 'Message', 6);

    expect(this.validatorFactoryHandler.handle(validation)).toBeTruthy();
  });

  it('should create a Pattern Validator', () => {
    const validation: Validation = new Pattern('pattern', 'Message', '^\\d{3}$');

    expect(this.validatorFactoryHandler.handle(validation)).toBeTruthy();
  });

  it('should create a Required Validator', () => {
    const validation: Validation = new Required('required', 'Message');

    expect(this.validatorFactoryHandler.handle(validation)).toBeTruthy();
  });

  it('should create a Required True Validator', () => {
    const validation: Validation = new Required('required', 'Message', true);

    expect(this.validatorFactoryHandler.handle(validation)).toBeTruthy();
  });

  it('should throw a ValidationTypeNotFoundError', () => {
    const validation: Validation = new Required('date', 'Message');

    // expect(this.validatorFactoryHandler.handle(validation)).toThrowError(ValidationTypeNotFoundError);

    try {
      this.validatorFactoryHandler.handle(validation);
    } catch (error) {
      expect(error instanceof ValidationTypeNotFoundError).toBeTruthy();

      return;
    }

    throw new Error();
  });
});
