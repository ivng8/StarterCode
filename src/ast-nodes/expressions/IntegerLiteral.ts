import { IASTVisitor, ILiteralExpression } from '../../interfaces';

/**
 * ASTNode representing an integer literal
 */
export class IntegerLiteral implements ILiteralExpression {
  public constructor(private value: number) {}
  
  public accept(visitor: IASTVisitor): void {
    visitor.visit(this);
  }

  public text(): string {
    return this.value.toString();
  }
}
