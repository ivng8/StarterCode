import { IASTVisitor, IStatement } from '../../interfaces';

/**
 * ASTNode representing a variable declaration
 */
export class DeclarationStmt implements IStatement {

  public constructor(private varName: string) {}
  
  public accept(visitor: IASTVisitor): void {
    visitor.visit(this);
  }

  public text(): string {
    return `let ${this.varName}`;
  }

  public getVarName(): string {
    return this.varName;
  }

}