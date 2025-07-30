export const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); // Ensure 2 digits (e.g., 05)
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  return `${day}/${month}`; // Returns "28/07"
};
export function numberCommaSeparated(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const toMoney = (value: number, needFraction = true) => {
    let parts = value.toFixed(2).split(".");
    parts[0] = parts[0].replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
    return `${needFraction ? parts.join(".") : parts[0]}`;
}