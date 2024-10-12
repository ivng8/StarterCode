import { IStatement, IExpression, IASTVisitor } from '../../interfaces';
import { ReferenceExpression } from '../expressions/ReferenceExpression';

/**
 * ASTNode representing an assignment statement
 */
export class AssignmentStmt implements IStatement {
  public constructor(private refExp: ReferenceExpression, private exp: IExpression) {}
  
  public accept(visitor: IASTVisitor): void {
    visitor.visit(this.refExp);
    this.exp.accept(visitor);
  }

  public text(): string {
    return `${this.refExp.getVarName()} = ${this.exp.text()}`;
  }
}
