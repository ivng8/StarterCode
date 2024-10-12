import { IASTNode } from "./interfaces/IASTNode.js";
import { IASTVisitor } from "./interfaces/IASTVisitor.js"

export class CountVisitor implements IASTVisitor {
    private varMap = new Map<String, number>();
    
    public visit(node: IASTNode): void {
        let nodeText : String[] = node.text().split(" ");
        let variable : String = nodeText[nodeText.length - 1];
        if (nodeText.length < 3) {
            if (this.varMap.has(variable)) {
                const current = this.varMap.get(variable)!;
                this.varMap.set(variable, current + 1);
            } else {
                this.varMap.set(variable, 0);
            }
        }
    }
    
    public getCount(variable: String): number {
        return this.varMap.get(variable)!;
    }
}