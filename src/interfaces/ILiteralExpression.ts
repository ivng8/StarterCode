import { IExpression } from './IExpression';

/**
 * ASTNode representing a literal
 */
export interface ILiteralExpression extends IExpression {
  text(): string;
}
