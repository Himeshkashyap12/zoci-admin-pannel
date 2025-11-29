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


export const isoToDDMMYYYY = (isoDate) => {
  const d = new Date(isoDate);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};


export const getChangedKeys = (oldObj, newObj) => {
  const changed = {};

  for (const key in newObj) {
    const oldValue = oldObj[key];
    const newValue = newObj[key];

    // Compare values (shallow comparison)
    if (oldValue !== newValue) {
      changed[key] =  newValue ;
    }
  }

 return changed;
};



export function compareNewAndOldObject({oldObj, newObj}) {
  const changed = {};

  for (const key in newObj) {
    // If value is different or key doesn't exist in oldObj
    if (oldObj[key] !== newObj[key]) {
      changed[key] = newObj[key];
    }
  }

  return changed;
}

 
