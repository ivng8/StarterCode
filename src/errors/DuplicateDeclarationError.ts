import { ITypeErrors } from "../interfaces/ITypeErrors";

export class DuplicateDeclarationError implements ITypeErrors {
    private varName: string;

    public constructor(varName: string) {
        this.varName = varName;
    }
    
    public getMessage(): string {
        return "Duplicate declaration of variable: " + this.varName;
    }
}