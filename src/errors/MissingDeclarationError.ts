import { ITypeErrors } from "../interfaces/ITypeErrors";

export class MissingDeclarationError implements ITypeErrors{
    private varName: string;

    public constructor(varName: string) {
        this.varName = varName;
    }

    public getMessage(): string {
        return "Missing declaration for variable: " + this.varName;
    }
}