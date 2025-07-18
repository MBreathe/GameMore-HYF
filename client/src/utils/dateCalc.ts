export function timer(timestamp: number) {
  const futureDate = new Date(timestamp * 1000);
  const now = new Date();

  let diff = futureDate.getTime() - now.getTime();

  if (diff <= 0) {
    console.log("The date is in the past");
  } else {
    const msInMin = 1000 * 60;
    const msInHour = msInMin * 60;
    const msInDay = msInHour * 24;

    const days = Math.floor(diff / msInDay);
    diff -= days * msInDay;

    const hours = Math.floor(diff / msInHour);
    diff -= hours * msInHour;

    const minutes = Math.floor(diff / msInMin);

    return `${days}D/${hours}H/${minutes}M`;
  }
}

export function date(timestamp: number | undefined) {
  if (!timestamp) return null;
  const futureDate = new Date(timestamp * 1000);

  const dayRelease = futureDate.getDate().toString().padStart(2, "0");
  const monthRelease = (futureDate.getMonth() + 1).toString().padStart(2, "0");
  const yearRelease = futureDate.getFullYear().toString().slice(-2);

  return `${dayRelease}/${monthRelease}/${yearRelease}`;
}
