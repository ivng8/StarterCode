import { BadConditionInIfError } from "./errors/BadConditionInIfError";
import { BadOperandInAddError } from "./errors/BadOperandInAddError";
import { BadOperandInComparisonError } from "./errors/BadOperandInComparisonError";
import { DuplicateDeclarationError } from "./errors/DuplicateDeclarationError";
import { MissingDeclarationError } from "./errors/MissingDeclarationError";
import { IASTNode, IASTVisitor } from "./interfaces";
import { ITypeErrors } from "./interfaces/ITypeErrors";

export class TypeCheckVisitor implements IASTVisitor {
    private errors: Array<ITypeErrors> = [];
    private declarations: string[] = [];
    private declaredVars: string[] = [];

    public visit(node: IASTNode): void {
        let nodeText: string = node.text();
        let nodeTexts: string[] = node.text().split(" ");
        let variable: string = nodeTexts[nodeTexts.length - 1]
        if (nodeText.includes('let')) {
            if (this.declarations.includes(nodeText)) {
                let error: DuplicateDeclarationError = new DuplicateDeclarationError(variable);
                this.errors.push(error);
            } else {
                this.declarations.push(nodeText);
                this.declaredVars.push(variable);
            }
        }
        if (variable !== 'true' && variable !== 'false' && isNaN(parseFloat(variable)) && variable !== "}") {
            if (!this.declaredVars.includes(variable)) {
                let error: MissingDeclarationError = new MissingDeclarationError(variable);
                this.errors.push(error);
            }
        }
        if (nodeText.includes('if')) {
            let beg: number;
            let end: number[] = [];
            let counter: number = 0;
            for (let i = 0; i < nodeTexts.length; i += 1) {
                switch (nodeTexts[i]) {
                    case 'if':
                        beg = i;
                        break;
                    case '{':
                        end.push(i);
                        break;
                    case '>':
                        if (i > beg && i < end[0]) {
                            counter += 1;
                        }
                        break;
                    default:
                        break;
                }
            }
            if (counter !== 1) {
                const condition = nodeTexts.slice(beg + 1, end[0]);
                let error: BadConditionInIfError = new BadConditionInIfError(condition.join(" ").replace(/[()]/gi, ""));
                this.errors.push(error);
            }
        } else if (nodeTexts.length === 3) {
            if (variable === 'true' || variable === 'false' || nodeTexts[0] === 'true' || nodeTexts[0] === 'false') {
                if (nodeTexts.includes('+')) {
                    let error: BadOperandInAddError = new BadOperandInAddError(nodeText);
                    this.errors.push(error);
                } else if (nodeTexts.includes('>')) {
                    let error: BadOperandInComparisonError = new BadOperandInComparisonError(nodeText);
                    this.errors.push(error);
                }
            }
        }
    }

    public getErrors(): Array<ITypeErrors> {
        return this.errors;
    }
}