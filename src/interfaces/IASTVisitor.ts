import { IASTNode } from "./IASTNode";

/**
 * interface for the visitors traversing an AST
 */
export interface IASTVisitor {

    /**
     * function for when a visitor visits a node
     * @param node the node its visiting
     */
    visit(node: IASTNode): void;
}