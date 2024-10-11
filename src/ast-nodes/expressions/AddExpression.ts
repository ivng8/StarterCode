import { IExpression } from '../../interfaces';

/**
 * ASTNode representing a binary "+" expression
 */
export class AddExpression implements IExpression {
  public constructor(private left: IExpression, private right: IExpression) {}

  public text(): string {
    return `${this.left.text()} + ${this.right.text()}`;
  }

  public getLeft(): IExpression {
    return this.left;
  }

  public getRight(): IExpression {
    return this.right;
  }
}
