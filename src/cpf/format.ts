import { onlyDigits } from "../utils";

/**
 * Remove a formatação de um CPF, retornando apenas os dígitos.
 *
 * @param cpf - CPF formatado (ex: "123.456.789-09")
 * @returns Apenas os dígitos (ex: "12345678909")
 */
export function strip(cpf: string): string {
  return onlyDigits(cpf);
}

/**
 * Formata um CPF para o padrão XXX.XXX.XXX-XX.
 *
 * @param cpf - CPF com ou sem formatação
 * @returns CPF formatado (ex: "123.456.789-09")
 *
 * @example
 * ```ts
 * format("12345678909"); // "123.456.789-09"
 * ```
 */
export function format(cpf: string): string {
  const digits = onlyDigits(cpf).padStart(11, "0").slice(0, 11);
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}
