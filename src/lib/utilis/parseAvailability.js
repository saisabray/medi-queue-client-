export const parseAvailability = (value) => {
  if (!value) return { days: "", time: "" };

  const cleaned = value.trim().replace(/\s+/g, " ");

  const match = cleaned.match(/^([A-Za-z]{3}\s*-\s*[A-Za-z]{3})\s+(.+)$/);

  if (!match) {
    return { days: "", time: "" };
  }

  const days = match[1]
    .replace(/\s*-\s*/g, " - ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const time = match[2]
    .replace(/(\d)(AM|PM)/gi, "$1 $2")
    .replace(/\s*-\s*/g, " - ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    days,
    time,
  };
};
