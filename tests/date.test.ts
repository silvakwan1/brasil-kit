import { describe, expect, it } from "vitest";
import { date } from "../src";

describe("date", () => {
  describe("isValid", () => {
    it("deve retornar true para datas válidas brasileiras", () => {
      expect(date.isValid("14/07/2026")).toBe(true);
      expect(date.isValid("29/02/2024")).toBe(true); // Ano bissexto
    });

    it("deve retornar false para datas inválidas brasileiras", () => {
      expect(date.isValid("32/07/2026")).toBe(false);
      expect(date.isValid("29/02/2026")).toBe(false); // Não bissexto
      expect(date.isValid("14-07-2026")).toBe(false); // Formato errado
      expect(date.isValid("abc")).toBe(false);
    });
  });

  describe("format", () => {
    it("deve formatar Date para DD/MM/YYYY por padrão", () => {
      const d = new Date(2026, 6, 14, 15, 30); // 14 de Julho (mês é indexado em 0)
      expect(date.format(d)).toBe("14/07/2026");
    });

    it("deve formatar Date incluindo hora se solicitado", () => {
      const d = new Date(2026, 6, 14, 15, 30);
      expect(date.format(d, { includeTime: true })).toBe("14/07/2026 15:30");
    });

    it("deve formatar uma string ISO para DD/MM/YYYY", () => {
      expect(date.format("2026-07-14T03:00:00Z")).toBe("14/07/2026");
    });

    it("deve retornar string vazia se a string de data for inválida", () => {
      expect(date.format("invalid-date")).toBe("");
    });
  });

  describe("parse", () => {
    it("deve fazer o parse de string simples DD/MM/YYYY", () => {
      const d = date.parse("14/07/2026");
      expect(d.getFullYear()).toBe(2026);
      expect(d.getMonth()).toBe(6); // Julho
      expect(d.getDate()).toBe(14);
    });

    it("deve fazer o parse de string com hora DD/MM/YYYY HH:mm", () => {
      const d = date.parse("14/07/2026 15:30");
      expect(d.getFullYear()).toBe(2026);
      expect(d.getMonth()).toBe(6);
      expect(d.getDate()).toBe(14);
      expect(d.getHours()).toBe(15);
      expect(d.getMinutes()).toBe(30);
    });
  });

  describe("parseISO", () => {
    it("deve converter string ISO para objeto Date", () => {
      const d = date.parseISO("2026-07-14T15:30:00Z");
      expect(d).toBeInstanceOf(Date);
      expect(d.getUTCFullYear()).toBe(2026);
      expect(d.getUTCMonth()).toBe(6);
      expect(d.getUTCDate()).toBe(14);
    });
  });
});
