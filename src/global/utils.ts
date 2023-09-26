export function formatDateTime(dateString: string): string {
  const dateObject = new Date(dateString);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const year = dateObject.getFullYear();
  const monthAbbreviation = months[dateObject.getMonth()];
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const ampm = hours >= 12 ? 'PM' : 'AM';

  const formattedHours = hours % 12 || 12; // Ensure 12-hour format

  const formattedDateTime = `${monthAbbreviation} ${day}, ${year} ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  return formattedDateTime;
}

