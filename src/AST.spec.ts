import {
  AssignmentStmt,
  ReferenceExpression,
  IntegerLiteral,
  SequenceStmt,
  AddExpression,
  GreaterThanExpression,
  DeclarationStmt,
  BooleanLiteral
} from './ast-nodes';
import { IStatement, ILiteralExpression, IExpression } from './interfaces';

describe('AST Tests', (): void => {
  it('calling text() on AssignmentStmt', (): void => {
    const a: IStatement = new AssignmentStmt(
      new ReferenceExpression('x'),
      new BooleanLiteral(true)
    );
    expect(a.text()).toEqual('x = true');
  });

  it('calling text() on nested AssignmentStmt', (): void => {
    const a1: IStatement = new AssignmentStmt(
      new ReferenceExpression('y'),
      new IntegerLiteral(1)
    );
    const a2: IStatement = new AssignmentStmt(new ReferenceExpression('x'), a1);
    expect(a2.text()).toEqual('x = y = 1');
  });

  it('calling text() on sequence of AssignmentStmts', (): void => {
    const a1: IStatement = new AssignmentStmt(
      new ReferenceExpression('x'),
      new IntegerLiteral(1)
    );
    const a2: IStatement = new AssignmentStmt(
      new ReferenceExpression('y'),
      new IntegerLiteral(7)
    );
    const seq: IStatement = new SequenceStmt([a1, a2]);
    expect(seq.text()).toEqual('x = 1; y = 7');
  });

  it('calling text() on + expression with two integer args', (): void => {
    const a1: ILiteralExpression = new IntegerLiteral(7);
    const a2: ILiteralExpression = new IntegerLiteral(8);
    const plus: IExpression = new AddExpression(a1, a2);
    expect(plus.text()).toEqual('7 + 8');
  });

  it('calling text() on + expression with two boolean args', (): void => {
    const a1: ILiteralExpression = new BooleanLiteral(true);
    const a2: ILiteralExpression = new BooleanLiteral(false);
    const plus: ILiteralExpression = new AddExpression(a1, a2);
    expect(plus.text()).toEqual('true + false');
  });

  it('calling text() on > expression with two numeric args', (): void => {
    const a1: ILiteralExpression = new IntegerLiteral(7);
    const a2: ILiteralExpression = new IntegerLiteral(8);
    const plus: ILiteralExpression = new GreaterThanExpression(a1, a2);
    expect(plus.text()).toEqual('7 > 8');
  });

  it('calling text() on + expression with two mixed args', (): void => {
    const a1: ILiteralExpression = new BooleanLiteral(true);
    const a2: ILiteralExpression = new IntegerLiteral(8);
    const plus: ILiteralExpression = new AddExpression(a1, a2);
    expect(plus.text()).toEqual('true + 8');
  });

  it('calling text() on a statement sequence', (): void => {
    const a1: IStatement = new DeclarationStmt('x');
    const a2: IStatement = new DeclarationStmt('y');
    const a3: ILiteralExpression = new IntegerLiteral(7);
    const a4: ILiteralExpression = new IntegerLiteral(8);
    const a5: IStatement = new AssignmentStmt(new ReferenceExpression('x'), a3);
    const a6: IStatement = new AssignmentStmt(new ReferenceExpression('y'), a4);
    const a7: IStatement = new AssignmentStmt(
      new ReferenceExpression('y'),
      new ReferenceExpression('x')
    );
    const seq: IStatement = new SequenceStmt([a1, a2, a5, a6, a7]);
    expect(seq.text()).toEqual('let x; let y; x = 7; y = 8; y = x');
  });

  it('calling text() on another statement sequence', (): void => {
    const a1: IStatement = new DeclarationStmt('x');
    const a2: IStatement = new DeclarationStmt('y');
    const a3: ILiteralExpression = new BooleanLiteral(false);
    const a4: ILiteralExpression = new IntegerLiteral(8);
    const a5: IStatement = new AssignmentStmt(new ReferenceExpression('x'), a3);
    const a6: IStatement = new AssignmentStmt(new ReferenceExpression('y'), a4);
    const a7: IStatement = new AssignmentStmt(
      new ReferenceExpression('y'),
      new ReferenceExpression('x')
    );
    const seq: IStatement = new SequenceStmt([a1, a2, a5, a6, a7]);
    expect(seq.text()).toEqual('let x; let y; x = false; y = 8; y = x');
  });
});
