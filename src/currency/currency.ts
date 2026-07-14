/**
 * Opções de formatação de valores monetários.
 */
export interface FormatOptions {
  /**
   * Se deve incluir o símbolo da moeda "R$" (padrão: `true`).
   */
  symbol?: boolean;
}

/**
 * Formata um número para Real Brasileiro (BRL).
 *
 * @param value - Valor numérico a ser formatado
 * @param options - Opções de formatação
 * @returns Valor formatado (ex: "R$ 1.500,00" ou "1.500,00")
 *
 * @example
 * ```ts
 * format(1500.50); // "R$ 1.500,50"
 * format(1500.50, { symbol: false }); // "1.500,50"
 * ```
 */
export function format(value: number, options: FormatOptions = {}): string {
  const { symbol = true } = options;

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: symbol ? "currency" : "decimal",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
}

/**
 * Converte uma string monetária brasileira em um número decimal (float).
 *
 * @param value - String monetária formatada (ex: "R$ 1.500,50" ou "1.500,50")
 * @returns Valor numérico ou NaN se inválido
 *
 * @example
 * ```ts
 * parse("R$ 1.500,50"); // 1500.5
 * parse("1.500,50"); // 1500.5
 * ```
 */
export function parse(value: string): number {
  // Remove R$, espaços, e pontos de milhar, e troca a vírgula decimal por ponto
  const cleanValue = value
    .replace(/R\$/g, "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  return Number.parseFloat(cleanValue);
}

/**
 * Converte qualquer valor monetário (seja número ou string formatada) para um float
 * limpo de 2 casas decimais, evitando imprecisões de ponto flutuante do JavaScript.
 *
 * @param value - Valor numérico ou string monetária
 * @returns Número decimal arredondado para 2 casas
 *
 * @example
 * ```ts
 * toDecimal("R$ 1.500,505"); // 1500.51
 * toDecimal(0.1 + 0.2);      // 0.3
 * ```
 */
export function toDecimal(value: number | string): number {
  const numValue = typeof value === "string" ? parse(value) : value;
  if (Number.isNaN(numValue)) return 0;
  return Math.round(numValue * 100) / 100;
}

/**
 * Soma com segurança múltiplos valores (números ou strings formatadas)
 * evitando erros de imprecisão de ponto flutuante do JavaScript.
 *
 * @param values - Lista de números ou strings monetárias a somar
 * @returns A soma decimal exata dos valores
 *
 * @example
 * ```ts
 * sum(0.1, 0.2); // 0.3
 * sum("R$ 100,50", "200,30", 50); // 350.8
 * ```
 */
export function sum(...values: (number | string)[]): number {
  const sumInCents = values.reduce<number>((acc, val) => {
    const decimal = typeof val === "string" ? parse(val) : val;
    if (Number.isNaN(decimal)) return acc;
    return acc + Math.round(decimal * 100);
  }, 0);

  return sumInCents / 100;
}

/**
 * Subtrai de forma segura dois valores (números ou strings formatadas),
 * evitando erros de imprecisão de ponto flutuante.
 *
 * @param a - Valor inicial
 * @param b - Valor a ser subtraído
 * @returns O resultado decimal exato
 *
 * @example
 * ```ts
 * subtract(0.3, 0.2); // 0.1
 * subtract("R$ 500,00", "200,50"); // 299.5
 * ```
 */
export function subtract(a: number | string, b: number | string): number {
  const decA = typeof a === "string" ? parse(a) : a;
  const decB = typeof b === "string" ? parse(b) : b;

  const centsA = Number.isNaN(decA) ? 0 : Math.round(decA * 100);
  const centsB = Number.isNaN(decB) ? 0 : Math.round(decB * 100);

  return (centsA - centsB) / 100;
}
