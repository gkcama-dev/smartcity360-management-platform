package com.smartcity.smartcity360.parte_dsl.expression;

import com.smartcity.smartcity360.parte_dsl.context.CityContext;

// Abstract Expression Interface in the Interpreter Pattern
public interface Expression {
    boolean interpret(CityContext context);
}
