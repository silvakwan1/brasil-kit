import { describe, expect, it } from "vitest";
import { cep } from "../src";

describe("cep", () => {
  describe("validate", () => {
    it("deve validar CEPs válidos", () => {
      expect(cep.validate("01001-000")).toBe(true);
      expect(cep.validate("01001000")).toBe(true);
      expect(cep.validate("70040-010")).toBe(true);
    });

    it("deve rejeitar CEPs com tamanho incorreto", () => {
      expect(cep.validate("0100100")).toBe(false);
      expect(cep.validate("010010001")).toBe(false);
      expect(cep.validate("")).toBe(false);
      expect(cep.validate("123")).toBe(false);
    });
  });

  describe("format", () => {
    it("deve formatar CEP corretamente", () => {
      expect(cep.format("01001000")).toBe("01001-000");
      expect(cep.format("70040010")).toBe("70040-010");
    });

    it("deve formatar CEP já formatado sem quebrar", () => {
      expect(cep.format("01001-000")).toBe("01001-000");
    });
  });

  describe("strip", () => {
    it("deve remover a formatação do CEP", () => {
      expect(cep.strip("01001-000")).toBe("01001000");
      expect(cep.strip("01001000")).toBe("01001000");
    });
  });
});
