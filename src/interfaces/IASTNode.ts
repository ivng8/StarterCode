import { IASTVisitor } from './IASTVisitor'

/**
 * Root of the AST Node hierarchy.
 */
export interface IASTNode {
  /**
   * create textual representation of the AST node
   */
  text(): string;

  /**
   * allows the visitor to traverse the nodes of an AST
   * @param visitor the visitor that is doing the traversing
   */
  accept(visitor: IASTVisitor): void;
}

