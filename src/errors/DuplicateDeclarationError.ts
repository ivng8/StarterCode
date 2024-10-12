import { ITypeErrors } from "../interfaces/ITypeErrors";

/**
 * error represented a declaration of a variable that is already declared
 */
export class DuplicateDeclarationError implements ITypeErrors {
    private varName: string;

    /**
     * constructor for this error
     * @param varName string representation of the variable that is already declared
     */
    public constructor(varName: string) {
        this.varName = varName;
    }
    
    public getMessage(): string {
        return "Duplicate declaration for variable: " + this.varName;
    }
}