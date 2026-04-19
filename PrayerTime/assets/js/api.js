export async function getPrayerTimes(lat,lng,year,month) {
    const response = await fetch(`https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${lat}&longitude=${lng}&method=2`);
    const data = await response.json();
    return data.data;
};