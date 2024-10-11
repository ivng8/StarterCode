import { IExpression, IStatement } from '../../interfaces';

/**
 * ASTNode representing an if statement.
 */
export class IfStmt implements IStatement {
  public constructor(private condition: IExpression, private thenStmt: IStatement, private elseStmt: IStatement) {}

  public text(): string {
    return `if (${this.condition.text()}) { ${this.thenStmt.text()} } else { ${this.elseStmt.text()} }`;
  }

  public getCondition(): IExpression {
    return this.condition;
  }
}
