/**
 * Opções de formatação de data.
 */
export interface DateFormatOptions {
  /**
   * Se deve incluir a hora na formatação (padrão: `false`).
   */
  includeTime?: boolean;
}

/**
 * Valida se uma string representa uma data válida no formato DD/MM/YYYY.
 *
 * @param dateStr - String da data (ex: "31/12/2026")
 * @returns `true` se for uma data válida
 *
 * @example
 * ```ts
 * isValid("31/12/2026"); // true
 * isValid("29/02/2026"); // false (ano não bissexto)
 * ```
 */
export function isValid(dateStr: string): boolean {
  const parts = dateStr.split("/");
  if (parts.length !== 3) return false;

  const day = Number.parseInt(parts[0], 10);
  const month = Number.parseInt(parts[1], 10);
  const year = Number.parseInt(parts[2], 10);

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // Verifica quantidade de dias corretos no mês/ano
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

/**
 * Formata um objeto Date ou uma string de data (incluindo ISO) para o padrão de data brasileiro.
 *
 * @param date - Objeto Date ou string de data (ex: "2026-07-14T15:30:00Z") a ser formatado
 * @param options - Opções de formatação
 * @returns Data formatada (ex: "14/07/2026" ou "14/07/2026 15:30")
 *
 * @example
 * ```ts
 * format(new Date(2026, 6, 14, 15, 30)); // "14/07/2026"
 * format("2026-07-14T15:30:00.000Z", { includeTime: true }); // "14/07/2026 12:30" (dependendo do timezone local)
 * ```
 */
export function format(date: Date | string, options: DateFormatOptions = {}): string {
  const { includeTime = false } = options;
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  // Se a data for inválida, retorna string vazia ou trata o erro
  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();

  if (includeTime) {
    const hours = String(parsedDate.getHours()).padStart(2, "0");
    const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return `${day}/${month}/${year}`;
}

/**
 * Converte uma string de data brasileira (DD/MM/YYYY ou DD/MM/YYYY HH:mm) em um objeto Date.
 *
 * @param dateStr - String da data formatada
 * @returns Objeto Date correspondente
 *
 * @example
 * ```ts
 * parse("14/07/2026"); // Date(2026-07-14)
 * parse("14/07/2026 15:30"); // Date(2026-07-14T15:30)
 * ```
 */
export function parse(dateStr: string): Date {
  const [datePart, timePart] = dateStr.split(" ");
  const [day, month, year] = datePart.split("/").map((v) => Number.parseInt(v, 10));

  let hours = 0;
  let minutes = 0;

  if (timePart) {
    const [h, m] = timePart.split(":").map((v) => Number.parseInt(v, 10));
    hours = h || 0;
    minutes = m || 0;
  }

  return new Date(year, month - 1, day, hours, minutes);
}

/**
 * Converte uma string ISO 8601 (ex: "2026-07-14T15:30:00Z") em um objeto Date.
 *
 * @param isoStr - String no formato ISO
 * @returns Objeto Date correspondente
 *
 * @example
 * ```ts
 * parseISO("2026-07-14T15:30:00Z"); // Objeto Date
 * ```
 */
export function parseISO(isoStr: string): Date {
  return new Date(isoStr);
}
