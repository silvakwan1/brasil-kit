/**
 * Extrai apenas os dígitos numéricos de uma string.
 */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Verifica se todos os caracteres de uma string são o mesmo dígito.
 * Útil para rejeitar documentos como 111.111.111-11.
 */
export function allSameDigit(value: string): boolean {
  return value.length > 0 && value.split("").every((char) => char === value[0]);
}

/**
 * Gera um dígito aleatório entre 0 e 9.
 */
export function randomDigit(): number {
  return Math.floor(Math.random() * 10);
}
