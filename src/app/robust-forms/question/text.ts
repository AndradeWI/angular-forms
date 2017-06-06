import { Dependency } from './dependency';
import { Question } from './question';
import { Validation } from './../validation';

export class Text extends Question<string> {

  public constructor(
    code: string,
    description: string,
    dependencies: Dependency[],
    fieldType: string,
    answer: string = null,
    validations: Validation[] = [],
    private _mask: string = null,
    private _placeholder: string = null,
  ) {
    super(code, description, dependencies, fieldType, answer, validations || []);
  }

  public get mask(): string {
    return this._mask;
  }

  public get placeholder(): string {
    return this._placeholder;
  }

  public static fromJson(question: Text): Text {
    return new Text(
      question.code,
      question.description,
      question.dependencies,
      question.fieldType,
      question.answer,
      question.validations,
      question.mask,
      question.placeholder
    );
  }
}
