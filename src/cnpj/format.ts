import { onlyDigits } from "../utils";

/**
 * Remove a formatação de um CNPJ, retornando apenas os dígitos.
 *
 * @param cnpj - CNPJ formatado (ex: "11.222.333/0001-81")
 * @returns Apenas os dígitos (ex: "11222333000181")
 */
export function strip(cnpj: string): string {
  return onlyDigits(cnpj);
}

/**
 * Formata um CNPJ para o padrão XX.XXX.XXX/XXXX-XX.
 *
 * @param cnpj - CNPJ com ou sem formatação
 * @returns CNPJ formatado (ex: "11.222.333/0001-81")
 *
 * @example
 * ```ts
 * format("11222333000181"); // "11.222.333/0001-81"
 * ```
 */
export function format(cnpj: string): string {
  const digits = onlyDigits(cnpj).padStart(14, "0").slice(0, 14);
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
}
