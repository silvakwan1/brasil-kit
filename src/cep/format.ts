import { onlyDigits } from "../utils";

/**
 * Remove a formatação de um CEP, retornando apenas os dígitos.
 *
 * @param cep - CEP formatado (ex: "01001-000")
 * @returns Apenas os dígitos (ex: "01001000")
 */
export function strip(cep: string): string {
  return onlyDigits(cep);
}

/**
 * Formata um CEP para o padrão XXXXX-XXX.
 *
 * @param cep - CEP com ou sem formatação
 * @returns CEP formatado (ex: "01001-000")
 *
 * @example
 * ```ts
 * format("01001000"); // "01001-000"
 * ```
 */
export function format(cep: string): string {
  const digits = onlyDigits(cep).padStart(8, "0").slice(0, 8);
  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
}
