import { IASTVisitor, IStatement } from '../../interfaces';

/**
 * ASTNode representing a sequence of statements.
 */
export class SequenceStmt implements IStatement {
  public constructor(private stmts: IStatement[]) {}
  
  public accept(visitor: IASTVisitor): void {
    for (let i = 0; i < this.stmts.length; i += 1) {
      this.stmts[i].accept(visitor);
    };
  }

  public text(): string {
    return this.stmts.map((stmt: IStatement): string => stmt.text()).join('; ');
  }
}
