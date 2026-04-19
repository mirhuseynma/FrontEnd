export function cleanTime(time) {
    return time.split(" ")[0];
}

export function getNextPrayer(day) {
    const prayers = [{ name: "Fajr", time: cleanTime(day.timings.Fajr) }, 
        { name: "Dhuhr", time: cleanTime(day.timings.Dhuhr) }, 
        { name: "Asr", time: cleanTime(day.timings.Asr) }, 
        { name: "Maghrib", time: cleanTime(day.timings.Maghrib) }, 
        { name: "Isha", time: cleanTime(day.timings.Isha) }];
    
    const now = new Date();
    for (let i = 0; i < prayers.length; i++) {
        const [hours, minutes] = prayers[i].time.split(":").map(Number);
        const time = new Date();
        time.setHours(hours, minutes, 0);
        if (time>now) return prayers[i];
    }
    return prayers[0];
}

