package com.smartcity.smartcity360.parte_dsl.expression;

import com.smartcity.smartcity360.parte_dsl.context.CityContext;

// Terminal Expression: Evaluates a single comparison between a telemetry variable and a constant
public class ComparisonExpression implements Expression {

    private final String variable;
    private final String operator;
    private final String targetValue;

    public ComparisonExpression(String variable, String operator, String targetValue) {
        this.variable = variable.toUpperCase().trim();
        this.operator = operator.trim();
        this.targetValue = targetValue.trim();
    }

    @Override
    public boolean interpret(CityContext context) {

        if (!context.has(variable)) {
            return false;
        }

        // Try numeric comparison if applicable
        try {
            double actualNum = context.getNumeric(variable);
            double targetNum = Double.parseDouble(targetValue);
            return switch (operator) {
                case ">" -> actualNum > targetNum;
                case "<" -> actualNum < targetNum;
                case ">=" -> actualNum >= targetNum;
                case "<=" -> actualNum <= targetNum;
                case "==" -> actualNum == targetNum;
                case "!=" -> actualNum != targetNum;
                default -> false;
            };
        } catch (NumberFormatException e) {
            // String comparison
            String actualStr = context.getString(variable);
            return switch (operator) {
                case "==" -> actualStr.equalsIgnoreCase(targetValue);
                case "!=" -> !actualStr.equalsIgnoreCase(targetValue);
                default -> false;
            };
        }
    }

    @Override
    public String toString() {
        return variable + " " + operator + " " + targetValue;
    }

}
