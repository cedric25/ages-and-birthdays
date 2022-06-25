export function containsYear(dateStr) {
  return /\d{4}/.test(dateStr.substring(dateStr.length - 4))
}
