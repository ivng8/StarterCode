import {
    AssignmentStmt,
    ReferenceExpression,
    IntegerLiteral,
    SequenceStmt,
    AddExpression,
    GreaterThanExpression,
    DeclarationStmt,
    BooleanLiteral,
    IfStmt
  } from './ast-nodes';
import { CountVisitor } from './CountVisitor';
import { IStatement, IExpression, ILiteralExpression } from './interfaces';
import { TypeCheckVisitor } from './TypeCheckVisitor';

describe('TypeCheckVisitor Tests', (): void => {
    it('duplicate declaration error', (): void => {
        const declx: IStatement = new DeclarationStmt('x');
        const decly: IStatement = new DeclarationStmt('x');
        const seq: IStatement = new SequenceStmt([declx, decly]);
        const typeVisitor: TypeCheckVisitor = new TypeCheckVisitor();
        seq.accept(typeVisitor);
        expect(typeVisitor.getTypeErrors().length).toEqual(1);
        expect(typeVisitor.getTypeErrors()[0].getMessage()).toEqual("Duplicate declaration for variable: x");
        });

    it('missing declaration error', (): void => {
        const z: ReferenceExpression = new ReferenceExpression('z');
        const one: IExpression = new IntegerLiteral(1);
        const assign1toz: IStatement = new AssignmentStmt(z, one);
        const seq: IStatement = new SequenceStmt([assign1toz]);
        const typeVisitor: TypeCheckVisitor = new TypeCheckVisitor();
        seq.accept(typeVisitor);
        expect(typeVisitor.getTypeErrors().length).toEqual(1);
        expect(typeVisitor.getTypeErrors()[0].getMessage()).toEqual("Missing declaration for variable: z");
        });

    it('bad operand in greater than right side', (): void => {
        const declz: IStatement = new DeclarationStmt('z');
        const z: ReferenceExpression = new ReferenceExpression('z');
        const one: IExpression = new BooleanLiteral(true);
        const compare1toz: IStatement = new GreaterThanExpression(z, one);
        const seq: IStatement = new SequenceStmt([declz, compare1toz]);
        const typeVisitor: TypeCheckVisitor = new TypeCheckVisitor();
        seq.accept(typeVisitor);
        expect(typeVisitor.getTypeErrors().length).toEqual(1);
        expect(typeVisitor.getTypeErrors()[0].getMessage()).toEqual("Bad operand in comparison expression: z > true");
        });

    it('bad operand in greater than left side', (): void => {
        const declz: IStatement = new DeclarationStmt('z');
        const z: ReferenceExpression = new ReferenceExpression('z');
        const one: IExpression = new BooleanLiteral(false);
        const compare1toz: IStatement = new GreaterThanExpression(one, z);
        const seq: IStatement = new SequenceStmt([declz, compare1toz]);
        const typeVisitor: TypeCheckVisitor = new TypeCheckVisitor();
        seq.accept(typeVisitor);
        expect(typeVisitor.getTypeErrors().length).toEqual(1);
        expect(typeVisitor.getTypeErrors()[0].getMessage()).toEqual("Bad operand in comparison expression: false > z");
        });

    it('bad operand in add right side', (): void => {
        const declz: IStatement = new DeclarationStmt('z');
        const z: ReferenceExpression = new ReferenceExpression('z');
        const one: IExpression = new BooleanLiteral(true);
        const add1toz: IStatement = new AddExpression(z, one);
        const seq: IStatement = new SequenceStmt([declz, add1toz]);
        const typeVisitor: TypeCheckVisitor = new TypeCheckVisitor();
        seq.accept(typeVisitor);
        expect(typeVisitor.getTypeErrors().length).toEqual(1);
        expect(typeVisitor.getTypeErrors()[0].getMessage()).toEqual("Bad operand in add expression: z + true");
        });

    it('bad operand in greater than left side', (): void => {
        const declz: IStatement = new DeclarationStmt('z');
        const z: ReferenceExpression = new ReferenceExpression('z');
        const one: IExpression = new BooleanLiteral(false);
        const add1toz: IStatement = new AddExpression(one, z);
        const seq: IStatement = new SequenceStmt([declz, add1toz]);
        const typeVisitor: TypeCheckVisitor = new TypeCheckVisitor();
        seq.accept(typeVisitor);
        expect(typeVisitor.getTypeErrors().length).toEqual(1);
        expect(typeVisitor.getTypeErrors()[0].getMessage()).toEqual("Bad operand in add expression: false + z");
        });

    it('nested boolean in condition clause', (): void => {
        const declx: IStatement = new DeclarationStmt('x');
        const declz: IStatement = new DeclarationStmt('z');
        const x: ReferenceExpression = new ReferenceExpression('x');
        const z: ReferenceExpression = new ReferenceExpression('z');
        const one: IExpression = new IntegerLiteral(1);
        const compare1tox: IStatement = new GreaterThanExpression(one, x);
        const compareztobool: IStatement = new GreaterThanExpression(z, compare1tox);
        const ifstmt: IStatement = new IfStmt(compareztobool, x, z);
        const seq: IStatement = new SequenceStmt([declx, declz, ifstmt]);
        const typeVisitor: TypeCheckVisitor = new TypeCheckVisitor();
        seq.accept(typeVisitor);
        expect(typeVisitor.getTypeErrors().length).toEqual(1);
        expect(typeVisitor.getTypeErrors()[0].getMessage()).toEqual("Bad condition in if statement: z > 1 > x");
        });

    it('no boolean in condition clause', (): void => {
        const declx: IStatement = new DeclarationStmt('x');
        const x: ReferenceExpression = new ReferenceExpression('x');
        const one: IExpression = new IntegerLiteral(1);
        const assign1tox: IStatement = new AssignmentStmt(x, one);
        const ifstmt: IStatement = new IfStmt(assign1tox, x, x);
        const seq: IStatement = new SequenceStmt([declx, ifstmt]);
        const typeVisitor: TypeCheckVisitor = new TypeCheckVisitor();
        seq.accept(typeVisitor);
        expect(typeVisitor.getTypeErrors().length).toEqual(1);
        expect(typeVisitor.getTypeErrors()[0].getMessage()).toEqual("Bad condition in if statement: x = 1");
        });
    
    it('multiple repeated errors at once', (): void => {
        const declx: IStatement = new DeclarationStmt('y');
        const decly: IStatement = new DeclarationStmt('y');
        const declz: IStatement = new DeclarationStmt('z');
        const x: ReferenceExpression = new ReferenceExpression('x');
        const y: ReferenceExpression = new ReferenceExpression('y');
        const z: ReferenceExpression = new ReferenceExpression('z');
        const one: ILiteralExpression = new IntegerLiteral(1);
        const two: ILiteralExpression = new IntegerLiteral(2);
        const t: ILiteralExpression = new BooleanLiteral(true);
        const assign1tox: IStatement = new AssignmentStmt(x, one);
        const assign2toy: IStatement = new AssignmentStmt(y, two);
        const comparison2: IExpression = new GreaterThanExpression(t, y);
        const comparison: IExpression = new GreaterThanExpression(z, comparison2);
        const assignxtoz: IStatement = new AssignmentStmt(z, x);
        const addttoy: IStatement = new AddExpression(y, t);
        const ifstmt: IStatement = new IfStmt(comparison, assignxtoz, addttoy);
        const seq: IStatement = new SequenceStmt([declx, decly, declz, assign1tox, 
            assign2toy,  ifstmt]);
        const typeVisitor: TypeCheckVisitor = new TypeCheckVisitor();
        seq.accept(typeVisitor);
        expect(typeVisitor.getTypeErrors().length).toEqual(6);
        expect(typeVisitor.getTypeErrors()[0].getMessage()).toEqual("Duplicate declaration for variable: y");
        expect(typeVisitor.getTypeErrors()[1].getMessage()).toEqual("Missing declaration for variable: x");
        expect(typeVisitor.getTypeErrors()[2].getMessage()).toEqual("Bad condition in if statement: z > true > y");
        expect(typeVisitor.getTypeErrors()[3].getMessage()).toEqual("Bad operand in comparison expression: true > y");
        expect(typeVisitor.getTypeErrors()[4].getMessage()).toEqual("Missing declaration for variable: x");
        expect(typeVisitor.getTypeErrors()[5].getMessage()).toEqual("Bad operand in add expression: y + true");
        });
})