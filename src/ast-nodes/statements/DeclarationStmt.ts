import { IStatement } from '../../interfaces';

/**
 * ASTNode representing a variable declaration
 */
export class DeclarationStmt implements IStatement {

  public constructor(private varName: string) {}

  public text(): string {
    return `let ${this.varName}`;
  }

  public getVarName(): string {
    return this.varName;
  }

}
