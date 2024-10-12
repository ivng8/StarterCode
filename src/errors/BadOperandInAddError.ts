import { ITypeErrors } from "../interfaces/ITypeErrors";

export class BadOperandInAddError implements ITypeErrors {
    private expr: string;

    public constructor(expr: string) {
        this.expr = expr;
    } 

    public getMessage(): string {
        return "Bad operand in add expression: " + this.expr;
    }
}