import { IASTNode } from "./IASTNode";

export interface IASTVisitor {

    visit(node: IASTNode): void;
}