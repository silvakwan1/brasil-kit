import { describe, expect, it } from "vitest";
import { cpf } from "../src";

describe("cpf", () => {
  describe("validate", () => {
    it("deve validar CPFs válidos", () => {
      expect(cpf.validate("529.982.247-25")).toBe(true);
      expect(cpf.validate("52998224725")).toBe(true);
      expect(cpf.validate("453.178.287-91")).toBe(true);
    });

    it("deve rejeitar CPFs inválidos", () => {
      expect(cpf.validate("123.456.789-00")).toBe(false);
      expect(cpf.validate("000.000.000-00")).toBe(false);
      expect(cpf.validate("111.111.111-11")).toBe(false);
    });

    it("deve rejeitar CPFs com tamanho incorreto", () => {
      expect(cpf.validate("123")).toBe(false);
      expect(cpf.validate("")).toBe(false);
      expect(cpf.validate("123456789012")).toBe(false);
    });

    it("deve rejeitar CPFs com todos os dígitos iguais", () => {
      expect(cpf.validate("000.000.000-00")).toBe(false);
      expect(cpf.validate("111.111.111-11")).toBe(false);
      expect(cpf.validate("222.222.222-22")).toBe(false);
      expect(cpf.validate("333.333.333-33")).toBe(false);
      expect(cpf.validate("444.444.444-44")).toBe(false);
      expect(cpf.validate("555.555.555-55")).toBe(false);
      expect(cpf.validate("666.666.666-66")).toBe(false);
      expect(cpf.validate("777.777.777-77")).toBe(false);
      expect(cpf.validate("888.888.888-88")).toBe(false);
      expect(cpf.validate("999.999.999-99")).toBe(false);
    });
  });

  describe("format", () => {
    it("deve formatar CPF corretamente", () => {
      expect(cpf.format("52998224725")).toBe("529.982.247-25");
      expect(cpf.format("45317828791")).toBe("453.178.287-91");
    });

    it("deve formatar CPF já formatado sem quebrar", () => {
      expect(cpf.format("529.982.247-25")).toBe("529.982.247-25");
    });
  });

  describe("strip", () => {
    it("deve remover a formatação do CPF", () => {
      expect(cpf.strip("529.982.247-25")).toBe("52998224725");
      expect(cpf.strip("52998224725")).toBe("52998224725");
    });
  });

  describe("generate", () => {
    it("deve gerar um CPF válido sem formatação", () => {
      const generated = cpf.generate();
      expect(generated).toHaveLength(11);
      expect(cpf.validate(generated)).toBe(true);
    });

    it("deve gerar um CPF válido com formatação", () => {
      const generated = cpf.generate(true);
      expect(generated).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
      expect(cpf.validate(generated)).toBe(true);
    });

    it("deve gerar CPFs diferentes a cada chamada", () => {
      const cpfs = new Set(Array.from({ length: 20 }, () => cpf.generate()));
      expect(cpfs.size).toBeGreaterThan(1);
    });
  });
});
