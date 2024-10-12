import { ITypeErrors } from "../interfaces/ITypeErrors";

/**
 * error for referencing a variable that is not declared
 */
export class MissingDeclarationError implements ITypeErrors{
    private varName: string;

    /**
     * constructor for this error
     * @param varName string representation of the variable that is not declared
     */
    public constructor(varName: string) {
        this.varName = varName;
    }

    public getMessage(): string {
        return "Missing declaration for variable: " + this.varName;
    }
}