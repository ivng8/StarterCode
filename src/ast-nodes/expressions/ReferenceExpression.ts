import { IASTVisitor, IExpression } from '../../interfaces';

/**
 * ASTNode representing a reference to a variable
 */
export class ReferenceExpression implements IExpression {
  public constructor(private varName: string) {}

  public accept(visitor: IASTVisitor): void {
    visitor.visit(this);
  }

  public getVarName(): string {
    return this.varName;
  }

  public text(): string {
    return this.varName;
  }
}
