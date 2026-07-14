import { onlyDigits } from "../utils";

/**
 * Remove a formatação de um telefone, retornando apenas os dígitos.
 *
 * @param phone - Telefone formatado (ex: "(11) 98765-4321")
 * @returns Apenas os dígitos (ex: "11987654321")
 */
export function strip(phone: string): string {
  return onlyDigits(phone);
}

/**
 * Formata um número de telefone brasileiro.
 *
 * - Fixo (10 dígitos): `(XX) XXXX-XXXX`
 * - Celular (11 dígitos): `(XX) XXXXX-XXXX`
 *
 * @param phone - Telefone com ou sem formatação
 * @returns Telefone formatado
 *
 * @example
 * ```ts
 * format("11987654321");  // "(11) 98765-4321"
 * format("1134567890");   // "(11) 3456-7890"
 * ```
 */
export function format(phone: string): string {
  const digits = onlyDigits(phone);

  if (digits.length === 11) {
    // Celular: (XX) XXXXX-XXXX
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }

  if (digits.length === 10) {
    // Fixo: (XX) XXXX-XXXX
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  }

  // Retorna como está se não for um tamanho reconhecido
  return digits;
}
