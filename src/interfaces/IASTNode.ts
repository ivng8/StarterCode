import { IASTVisitor } from './IASTVisitor';

/**
 * Root of the AST Node hierarchy.
 */
export interface IASTNode {
  /**
   * create textual representation of the AST node
   */
  text(): string;

  accept(visitor: IASTVisitor): IASTNode;
}

