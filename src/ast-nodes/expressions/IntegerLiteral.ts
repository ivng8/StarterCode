import { ILiteralExpression } from '../../interfaces';

/**
 * ASTNode representing an integer literal
 */
export class IntegerLiteral implements ILiteralExpression {
  public constructor(private value: number) {}

  public text(): string {
    return this.value.toString();
  }
}
