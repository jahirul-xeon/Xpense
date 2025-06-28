export const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); // Ensure 2 digits (e.g., 05)
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  return `${day}/${month}`; // Returns "28/07"
};