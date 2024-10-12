import { ITypeErrors } from "../interfaces/ITypeErrors";

export class BadOperandInComparisonError implements ITypeErrors{
    private expr: string;

    public constructor(expr: string) {
        this.expr = expr;
    } 

    public getMessage(): string {
        return "Bad operand in comparison expression: " + this.expr;
    }
}