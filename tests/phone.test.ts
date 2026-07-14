import { describe, expect, it } from "vitest";
import { phone } from "../src";

describe("phone", () => {
  describe("validate", () => {
    it("deve validar celulares válidos (11 dígitos)", () => {
      expect(phone.validate("(11) 98765-4321")).toBe(true);
      expect(phone.validate("11987654321")).toBe(true);
      expect(phone.validate("(21) 99876-5432")).toBe(true);
    });

    it("deve validar fixos válidos (10 dígitos)", () => {
      expect(phone.validate("(11) 3456-7890")).toBe(true);
      expect(phone.validate("1134567890")).toBe(true);
    });

    it("deve rejeitar telefones com tamanho incorreto", () => {
      expect(phone.validate("123")).toBe(false);
      expect(phone.validate("")).toBe(false);
      expect(phone.validate("123456789012")).toBe(false);
    });

    it("deve rejeitar celulares que não começam com 9 após DDD", () => {
      expect(phone.validate("11187654321")).toBe(false);
      expect(phone.validate("11287654321")).toBe(false);
    });

    it("deve rejeitar DDDs inválidos (menores que 11)", () => {
      expect(phone.validate("0134567890")).toBe(false);
      expect(phone.validate("1034567890")).toBe(false);
    });
  });

  describe("format", () => {
    it("deve formatar celular corretamente", () => {
      expect(phone.format("11987654321")).toBe("(11) 98765-4321");
    });

    it("deve formatar fixo corretamente", () => {
      expect(phone.format("1134567890")).toBe("(11) 3456-7890");
    });

    it("deve retornar dígitos para tamanhos não reconhecidos", () => {
      expect(phone.format("123")).toBe("123");
    });
  });

  describe("strip", () => {
    it("deve remover a formatação do telefone", () => {
      expect(phone.strip("(11) 98765-4321")).toBe("11987654321");
      expect(phone.strip("(11) 3456-7890")).toBe("1134567890");
    });
  });
});
