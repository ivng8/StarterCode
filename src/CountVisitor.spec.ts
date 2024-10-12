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
import { CountVisitor } from "./CountVisitors";
import { IStatement, ILiteralExpression, IExpression } from "./interfaces";

describe('CountVisitor Tests', (): void => {
    it('count references in small AST', (): void => {
        const declx: IStatement = new DeclarationStmt('x');
        const decly: IStatement = new DeclarationStmt('y');
        const declz: IStatement = new DeclarationStmt('z');
        const x: ReferenceExpression = new ReferenceExpression('x');
        const y: ReferenceExpression = new ReferenceExpression('y');
        const z: ReferenceExpression = new ReferenceExpression('z');
        const one: ILiteralExpression = new IntegerLiteral(1);
        const two: ILiteralExpression = new IntegerLiteral(2);
        const assign1tox: IStatement = new AssignmentStmt(x, one);
        const assign2toy: IStatement = new AssignmentStmt(y, two);
        const comparison: IExpression = new GreaterThanExpression(x, y);
        const assignxtoz: IStatement = new AssignmentStmt(z, x);
        const assignytoz: IStatement = new AssignmentStmt(z, y);
        const ifstmt: IStatement = new IfStmt(comparison, assignxtoz, assignytoz);
        const incrementz: IStatement = new AssignmentStmt(z, new AddExpression(z, one));
        const seq: IStatement = new SequenceStmt([declx, decly, declz, assign1tox,
        assign2toy, ifstmt, incrementz]);
        const countVisitor: CountVisitor = new CountVisitor();
        seq.accept(countVisitor);
        expect(countVisitor.getCount('x')).toEqual(3);
        expect(countVisitor.getCount('y')).toEqual(3);
        expect(countVisitor.getCount('z')).toEqual(4);
        });

    it('count references for AddExpression', (): void => {
        const declx: IStatement = new DeclarationStmt('x');
        const decly: IStatement = new DeclarationStmt('y');
        const x: ReferenceExpression = new ReferenceExpression('x');
        const y: ReferenceExpression = new ReferenceExpression('y');
        const addxtoy: IExpression = new AddExpression(x, y);
        const seq: IStatement = new SequenceStmt([declx, decly, addxtoy]);
        const countVisitor: CountVisitor = new CountVisitor();
        seq.accept(countVisitor);
        expect(countVisitor.getCount('x')).toEqual(1);
        expect(countVisitor.getCount('y')).toEqual(1);
    });

    it('count references for GreaterThanExpression', (): void => {
        const declx: IStatement = new DeclarationStmt('x');
        const decly: IStatement = new DeclarationStmt('y');
        const x: ReferenceExpression = new ReferenceExpression('x');
        const y: ReferenceExpression = new ReferenceExpression('y');
        const comparextoy: IExpression = new GreaterThanExpression(x, y);
        const seq: IStatement = new SequenceStmt([declx, decly, comparextoy]);
        const countVisitor: CountVisitor = new CountVisitor();
        seq.accept(countVisitor);
        expect(countVisitor.getCount('x')).toEqual(1);
        expect(countVisitor.getCount('y')).toEqual(1);
    });

    it('count references for AssignmentStmt', (): void => {
        const declx: IStatement = new DeclarationStmt('x');
        const x: ReferenceExpression = new ReferenceExpression('x');
        const one: ILiteralExpression = new IntegerLiteral(1);
        const assign1tox: IExpression = new AssignmentStmt(x, one);
        const seq: IStatement = new SequenceStmt([declx, assign1tox]);
        const countVisitor: CountVisitor = new CountVisitor();
        seq.accept(countVisitor);
        expect(countVisitor.getCount('x')).toEqual(1);
    });

    it('count references in extreme nesting', (): void => {
        const declz: IStatement = new DeclarationStmt('z');
        const z: ReferenceExpression = new ReferenceExpression('z');
        const one: ILiteralExpression = new IntegerLiteral(1);
        const two: ILiteralExpression = new IntegerLiteral(2);
        const comparison: IExpression = new GreaterThanExpression(z, one);
        const assignxtoz: IStatement = new AssignmentStmt(z, one);
        const assignytoz: IStatement = new AssignmentStmt(z, two);
        const ifstmt: IStatement = new IfStmt(comparison, assignxtoz, assignytoz);
        const incrementz: IStatement = new AssignmentStmt(z, new AddExpression(z, ifstmt));
        const seq: IStatement = new SequenceStmt([declz, incrementz]);
        const countVisitor: CountVisitor = new CountVisitor();
        seq.accept(countVisitor);
        expect(countVisitor.getCount('z')).toEqual(5);
        });

    it('count references for 0 calls', (): void => {
        const declz: IStatement = new DeclarationStmt('z');
        const seq: IStatement = new SequenceStmt([declz]);
        const countVisitor: CountVisitor = new CountVisitor();
        seq.accept(countVisitor);
        expect(countVisitor.getCount('z')).toEqual(0);
        });

    it('count references in large AST', (): void => {
        const declx: IStatement = new DeclarationStmt('x');
        const decly: IStatement = new DeclarationStmt('y');
        const declz: IStatement = new DeclarationStmt('z');
        const decla: IStatement = new DeclarationStmt('a');
        const declb: IStatement = new DeclarationStmt('b');
        const declc: IStatement = new DeclarationStmt('c');
        const x: ReferenceExpression = new ReferenceExpression('x');
        const y: ReferenceExpression = new ReferenceExpression('y');
        const z: ReferenceExpression = new ReferenceExpression('z');
        const a: ReferenceExpression = new ReferenceExpression('a');
        const b: ReferenceExpression = new ReferenceExpression('b');
        const c: ReferenceExpression = new ReferenceExpression('c');
        const one: ILiteralExpression = new IntegerLiteral(1);
        const two: ILiteralExpression = new IntegerLiteral(2);
        const assign1tox: IStatement = new AssignmentStmt(x, one);
        const assign2toy: IStatement = new AssignmentStmt(y, two);
        const assign1toa: IStatement = new AssignmentStmt(a, one);
        const assign2tob: IStatement = new AssignmentStmt(b, two);
        const assign1toc: IStatement = new AssignmentStmt(c, one);
        const comparison: IExpression = new GreaterThanExpression(x, y);
        const comparison1: IExpression = new GreaterThanExpression(a, b);
        const assignxtoz: IStatement = new AssignmentStmt(z, x);
        const assignytoz: IStatement = new AssignmentStmt(z, y);
        const ifstmt: IStatement = new IfStmt(comparison, assignxtoz, assignytoz);
        const ifstmt1: IStatement = new IfStmt(comparison1, assign1tox, assign2toy);
        const incrementz: IStatement = new AssignmentStmt(z, new AddExpression(z, one));
        const seq: IStatement = new SequenceStmt([declx, decly, declz, decla, declb, declc, 
        assign1tox, assign2toy, assign1toa, assign2tob, assign1toc, ifstmt, incrementz, 
        ifstmt1, ifstmt, ifstmt]);
        const countVisitor: CountVisitor = new CountVisitor();
        seq.accept(countVisitor);
        expect(countVisitor.getCount('x')).toEqual(8);
        expect(countVisitor.getCount('y')).toEqual(8);
        expect(countVisitor.getCount('z')).toEqual(8);
        expect(countVisitor.getCount('a')).toEqual(2);
        expect(countVisitor.getCount('b')).toEqual(2);
        expect(countVisitor.getCount('c')).toEqual(1);
        });
})