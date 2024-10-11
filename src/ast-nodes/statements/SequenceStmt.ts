import { IStatement } from '../../interfaces';

/**
 * ASTNode representing a sequence of statements.
 */
export class SequenceStmt implements IStatement {
  public constructor(private stmts: IStatement[]) {}

  public text(): string {
    return this.stmts.map((stmt: IStatement): string => stmt.text()).join('; ');
  }
}
