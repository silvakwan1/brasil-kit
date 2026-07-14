import { describe, expect, it } from "vitest";
import { currency } from "../src";

describe("currency", () => {
  describe("format", () => {
    it("deve formatar valor monetário em Real por padrão", () => {
      // Nota: o formatter usa espaços não quebráveis (\u00a0) na separação de R$ e valor
      const result = currency.format(1500.5);
      expect(result).toMatch(/R\$\s?1\.500,50/);
    });

    it("deve formatar valor monetário sem o símbolo", () => {
      expect(currency.format(1500.5, { symbol: false })).toBe("1.500,50");
      expect(currency.format(0.99, { symbol: false })).toBe("0,99");
    });
  });

  describe("parse", () => {
    it("deve converter string monetária com símbolo para number", () => {
      expect(currency.parse("R$ 1.500,50")).toBe(1500.5);
      expect(currency.parse("R$ 1.500,50")).toBe(1500.5); // com NBSP
    });

    it("deve converter string monetária sem símbolo para number", () => {
      expect(currency.parse("1.500,50")).toBe(1500.5);
      expect(currency.parse("0,99")).toBe(0.99);
    });

    it("deve lidar com valores sem ponto de milhar", () => {
      expect(currency.parse("50,00")).toBe(50);
    });
  });

  describe("toDecimal", () => {
    it("deve converter número para float com 2 casas decimais", () => {
      expect(currency.toDecimal(123.456)).toBe(123.46);
      expect(currency.toDecimal(0.1 + 0.2)).toBe(0.3);
    });

    it("deve converter string monetária para float", () => {
      expect(currency.toDecimal("R$ 1.500,505")).toBe(1500.51);
      expect(currency.toDecimal("1.500,50")).toBe(1500.5);
    });

    it("deve retornar 0 para entradas inválidas", () => {
      expect(currency.toDecimal("abc")).toBe(0);
    });
  });

  describe("sum", () => {
    it("deve somar números com precisão e evitar erros de ponto flutuante", () => {
      expect(currency.sum(0.1, 0.2)).toBe(0.3);
      expect(currency.sum(100.1, 200.2, 300.3)).toBe(600.6);
    });

    it("deve somar strings monetárias brasileiras e números juntos", () => {
      expect(currency.sum("R$ 1.500,50", "500,00", 200)).toBe(2200.5);
    });

    it("deve ignorar valores inválidos na soma", () => {
      expect(currency.sum(100, "abc", 50)).toBe(150);
    });
  });

  describe("subtract", () => {
    it("deve subtrair números com precisão", () => {
      expect(currency.subtract(0.3, 0.2)).toBe(0.1);
      expect(currency.subtract(500.55, 200.35)).toBe(300.2);
    });

    it("deve subtrair strings monetárias brasileiras e números juntos", () => {
      expect(currency.subtract("R$ 1.500,50", "500,50")).toBe(1000);
      expect(currency.subtract("500,00", 200)).toBe(300);
    });

    it("deve tratar valores inválidos como 0", () => {
      expect(currency.subtract(100, "abc")).toBe(100);
      expect(currency.subtract("abc", 50)).toBe(-50);
    });
  });
});
