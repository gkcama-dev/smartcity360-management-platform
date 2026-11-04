package com.smartcity.smartcity360.parte_dsl.parser;

import com.smartcity.smartcity360.parte_dsl.expression.AndExpression;
import com.smartcity.smartcity360.parte_dsl.expression.ComparisonExpression;
import com.smartcity.smartcity360.parte_dsl.expression.Expression;
import com.smartcity.smartcity360.parte_dsl.expression.OrExpression;

// Parser that converts a DSL policy string into an Abstract Syntax Tree (AST) of Expressions
public class PolicyParser {

    public static Expression parse(String dslRule) {

        if (dslRule == null || dslRule.trim().isEmpty()) {
            throw new IllegalArgumentException("DSL rule cannot be empty");
        }

        // Split by OR operators first (lower precedence)
        if (dslRule.toUpperCase().contains(" OR ")) {
            String[] parts = dslRule.split("(?i)\\s+OR\\s+", 2);
            return new OrExpression(parse(parts[0]), parse(parts[1]));
        }

        // Next split by AND operators (higher precedence)
        if (dslRule.toUpperCase().contains(" AND ")) {
            String[] parts = dslRule.split("(?i)\\s+AND\\s+", 2);
            return new AndExpression(parse(parts[0]), parse(parts[1]));
        }

        // Base case: parse terminal comparison expression (e.g. "NOISE_LEVEL > 75")
        return parseTerminal(dslRule.trim());
    }

    private static ComparisonExpression parseTerminal(String token) {
        String[] operators = {">=", "<=", "!=", "==", ">", "<"};
        for (String op : operators) {
            if (token.contains(op)) {
                String[] parts = token.split(op, 2);
                return new ComparisonExpression(parts[0], op, parts[1]);
            }
        }
        throw new IllegalArgumentException("Invalid comparison syntax in rule: " + token);
    }

}
