import { ITypeErrors } from "../interfaces/ITypeErrors";

export class BadConditionInIfError implements ITypeErrors {
    private cond: string;

    public constructor(cond: string) {
        this.cond = cond;
    } 

    public getMessage(): string {
        return "Bad condition in if statement: " + this.cond;
    }
}