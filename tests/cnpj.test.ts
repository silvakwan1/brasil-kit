import { describe, expect, it } from "vitest";
import { cnpj } from "../src";

describe("cnpj", () => {
  describe("validate", () => {
    it("deve validar CNPJs válidos", () => {
      expect(cnpj.validate("11.222.333/0001-81")).toBe(true);
      expect(cnpj.validate("11222333000181")).toBe(true);
    });

    it("deve rejeitar CNPJs inválidos", () => {
      expect(cnpj.validate("11.222.333/0001-00")).toBe(false);
      expect(cnpj.validate("12345678901234")).toBe(false);
    });

    it("deve rejeitar CNPJs com tamanho incorreto", () => {
      expect(cnpj.validate("123")).toBe(false);
      expect(cnpj.validate("")).toBe(false);
      expect(cnpj.validate("123456789012345")).toBe(false);
    });

    it("deve rejeitar CNPJs com todos os dígitos iguais", () => {
      expect(cnpj.validate("11.111.111/1111-11")).toBe(false);
      expect(cnpj.validate("00.000.000/0000-00")).toBe(false);
      expect(cnpj.validate("22.222.222/2222-22")).toBe(false);
    });
  });

  describe("format", () => {
    it("deve formatar CNPJ corretamente", () => {
      expect(cnpj.format("11222333000181")).toBe("11.222.333/0001-81");
    });

    it("deve formatar CNPJ já formatado sem quebrar", () => {
      expect(cnpj.format("11.222.333/0001-81")).toBe("11.222.333/0001-81");
    });
  });

  describe("strip", () => {
    it("deve remover a formatação do CNPJ", () => {
      expect(cnpj.strip("11.222.333/0001-81")).toBe("11222333000181");
      expect(cnpj.strip("11222333000181")).toBe("11222333000181");
    });
  });

  describe("generate", () => {
    it("deve gerar um CNPJ válido sem formatação", () => {
      const generated = cnpj.generate();
      expect(generated).toHaveLength(14);
      expect(cnpj.validate(generated)).toBe(true);
    });

    it("deve gerar um CNPJ válido com formatação", () => {
      const generated = cnpj.generate(true);
      expect(generated).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
      expect(cnpj.validate(generated)).toBe(true);
    });

    it("deve gerar CNPJs diferentes a cada chamada", () => {
      const cnpjs = new Set(Array.from({ length: 20 }, () => cnpj.generate()));
      expect(cnpjs.size).toBeGreaterThan(1);
    });
  });
});
