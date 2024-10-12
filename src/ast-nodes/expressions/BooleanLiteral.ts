import { IASTVisitor, ILiteralExpression } from '../../interfaces';

/**
 * ASTNode representing a boolean literal
 */
export class BooleanLiteral implements ILiteralExpression {
  public constructor(private value: true | false) {}
  
  public accept(visitor: IASTVisitor): void {
    visitor.visit(this);
  }

  public text(): string {
    return `${this.value}`;
  }
}
