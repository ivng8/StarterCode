import { ITypeErrors } from "../interfaces/ITypeErrors";

/**
 * Error representing an invalid operand for an add
 */
export class BadOperandInAddError implements ITypeErrors {
    private expr: string;

    /**
     * constructor for this error
     * @param expr string representation of the invalid operand
     */
    public constructor(expr: string) {
        this.expr = expr;
    } 

    public getMessage(): string {
        return "Bad operand in add expression: " + this.expr;
    }
}