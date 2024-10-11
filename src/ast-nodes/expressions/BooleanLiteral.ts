import { ILiteralExpression } from '../../interfaces';

/**
 * ASTNode representing a boolean literal
 */
export class BooleanLiteral implements ILiteralExpression {
  public constructor(private value: true | false) {}

  public text(): string {
    return `${this.value}`;
  }
}
