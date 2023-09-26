export function formatDateTime(dateString: string): string {
  const dateObject = new Date(dateString);

  // Define an array for mapping month numbers to 3-letter month abbreviations
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Get the components of the date and time
  const year = dateObject.getFullYear();
  const monthAbbreviation = months[dateObject.getMonth()];
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  // Determine AM or PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12; // Ensure 12-hour format

  // Format the date and time string
  const formattedDateTime = `${monthAbbreviation} ${day}, ${year} ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  return formattedDateTime;
}

