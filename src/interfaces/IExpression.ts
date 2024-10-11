import { IASTNode } from './IASTNode';

/**
 * root of the Expression subhierarchy.
 */
export interface IExpression extends IASTNode {
  text(): string;
}
