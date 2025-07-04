export default function isValidDate(dateString: string | undefined): Date | false {
  if (!dateString) return false;

  // Check format with regex
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  // Check if it's a valid date
  const date = new Date(dateString);

  const minDate = new Date("2010-01-01");
  const maxDate = new Date("2036-12-31");

  // Check if the date is valid, if not return false
  return date >= minDate && date <= maxDate ? date : false;
}
