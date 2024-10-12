import { ITypeErrors } from "../interfaces/ITypeErrors";

/**
 * error representating an invalid operand for a comparison function
 */
export class BadOperandInComparisonError implements ITypeErrors{
    private expr: string;

    /**
     * constructor for this error
     * @param expr string representation of the invalid operand
     */
    public constructor(expr: string) {
        this.expr = expr;
    } 

    public getMessage(): string {
        return "Bad operand in comparison expression: " + this.expr;
    }
}