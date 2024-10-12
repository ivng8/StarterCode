import { IASTVisitor, IExpression, IStatement } from '../../interfaces';

/**
 * ASTNode representing an if statement.
 */
export class IfStmt implements IStatement {
  public constructor(private condition: IExpression, private thenStmt: IStatement, private elseStmt: IStatement) {}
  
  public accept(visitor: IASTVisitor): void {
    visitor.visit(this);
    this.getCondition().accept(visitor);
    this.thenStmt.accept(visitor);
    this.elseStmt.accept(visitor);
  }

  public text(): string {
    return `if (${this.condition.text()}) { ${this.thenStmt.text()} } else { ${this.elseStmt.text()} }`;
  }

  public getCondition(): IExpression {
    return this.condition;
  }
}
