export function isoToIST(isoString) {
  const date = new Date(isoString); // Convert ISO string to Date object
  return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

export function isoToISTTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  });
}
export function blogDateConverter(isoString) {
  const date = new Date(isoString);

  const day = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
  });

  const month = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short", // ⬅️ short month name
  });

  return [day, month];
}



 
