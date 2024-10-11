import { IStatement, IExpression } from '../../interfaces';
import { ReferenceExpression } from '../expressions/ReferenceExpression';

/**
 * ASTNode representing an assignment statement
 */
export class AssignmentStmt implements IStatement {
  public constructor(private refExp: ReferenceExpression, private exp: IExpression) {}

  public text(): string {
    return `${this.refExp.getVarName()} = ${this.exp.text()}`;
  }
}
