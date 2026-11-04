package com.smartcity.smartcity360.parte_dsl.expression;

import com.smartcity.smartcity360.parte_dsl.context.CityContext;

// Non-Terminal Expression: Evaluates logical OR across two child expressions
public class OrExpression implements Expression {

    private final Expression left;
    private final Expression right;
    public OrExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public boolean interpret(CityContext context) {
        return left.interpret(context) || right.interpret(context);
    }

    @Override
    public String toString() {
        return "(" + left + " OR " + right + ")";
    }
}
