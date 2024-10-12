import { ITypeErrors } from "../interfaces/ITypeErrors";

/**
 * Error representing if the condition of an if statement is not valid
 */
export class BadConditionInIfError implements ITypeErrors {
    private cond: string;

    /**
     * constructor for the error
     * @param cond the string representing an invalid condition clause
     */
    public constructor(cond: string) {
        this.cond = cond;
    } 

    public getMessage(): string {
        return "Bad condition in if statement: " + this.cond;
    }
}