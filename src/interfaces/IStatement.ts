import { IASTNode } from './IASTNode';

/**
 * root of the Statement subhierarchy.
 */
export interface IStatement extends IASTNode {
  text(): string;
}
