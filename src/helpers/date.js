export function containsYear(dateStr) {
  return /\d{4}/.test(dateStr.substr(dateStr.length - 4))
}
