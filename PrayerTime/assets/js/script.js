import { getPrayerTimes } from "./api.js";
import { cleanTime, getNextPrayer } from "./utils.js";

const DEFAULT_COORDS = {
    lat: 40.4093,
    lng: 49.8671,
};

const COUNTRY_COORDS = {
    Azerbaijan: { lat: 40.4093, lng: 49.8671 },
    Iran: { lat: 35.6892, lng: 51.389 },
    Turkey: { lat: 39.9334, lng: 32.8597 },
    "Saudi Arabia": { lat: 24.7136, lng: 46.6753 },
    Egypt: { lat: 30.0444, lng: 31.2357 },
};

const COUNTRY_NAMES = Object.keys(COUNTRY_COORDS);

const state = {
    lat: DEFAULT_COORDS.lat,
    lng: DEFAULT_COORDS.lng,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    days: [],
    country: COUNTRY_NAMES[0]
};

const PRAYER_NAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

function setStatus(text) {
    const status = document.getElementById("status");
    status.textContent = text;
}

function applyCountryCoords(countryName) {
    const coords = COUNTRY_COORDS[countryName] || DEFAULT_COORDS;
    state.lat = coords.lat;
    state.lng = coords.lng;
}

function getCurrentPosition() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve(null);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            () => resolve(null),
            { timeout: 7000 }
        );
    });
}

async function applyLocationWithFallback() {
    const coords = await getCurrentPosition();

    if (coords) {
        state.lat = coords.lat;
        state.lng = coords.lng;
        return true;
    }

    applyCountryCoords(state.country);
    return false;
}

function renderPrayer(name, day, next) {
    const time = cleanTime(day.timings[name]);
    return `
        <div class="today-prayer ${name === next.name ? "active" : ""}">
            <span>${name}</span>
            <span>${time}</span>
        </div>
    `;
}

function renderToday(day) {
    const next = getNextPrayer(day);
    const todayContainer = document.getElementById("today");
    const dateLabel = document.getElementById("todayDate");
    const nextPrayerInfo = document.getElementById("nextPrayerInfo");

    dateLabel.textContent = day.date.readable;
    todayContainer.innerHTML = PRAYER_NAMES.map((name) => renderPrayer(name, day, next)).join("");

    nextPrayerInfo.classList.remove("d-none");
    nextPrayerInfo.textContent = `Next prayer: ${next.name} at ${next.time}`;
}

function renderCalendar(days) {
    const el = document.getElementById("calendar");
    const now = new Date();
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth() + 1;
    const todayDate = now.getDate();

    const rows = days.map((day, index) => {
        const dayNumber = index + 1;
        const isToday = state.year === todayYear && state.month === todayMonth && dayNumber === todayDate;

        return `
            <tr class="${isToday ? "is-today" : ""}">
                <td>${day.date.gregorian.date}</td>
                <td>${day.date.hijri.date}</td>
                <td>${cleanTime(day.timings.Fajr)}</td>
                <td>${cleanTime(day.timings.Dhuhr)}</td>
                <td>${cleanTime(day.timings.Asr)}</td>
                <td>${cleanTime(day.timings.Maghrib)}</td>
                <td>${cleanTime(day.timings.Isha)}</td>
            </tr>
        `;
    }).join("");

    el.innerHTML = `
        <table class="table table-sm table-hover align-middle mb-0">
            <thead>
                <tr>
                    <th>Gregorian</th>
                    <th>Hijri</th>
                    <th>Fajr</th>
                    <th>Dhuhr</th>
                    <th>Asr</th>
                    <th>Maghrib</th>
                    <th>Isha</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

function populateSelectors() {
    const monthSelect = document.getElementById("monthSelect");
    const yearSelect = document.getElementById("yearSelect");
    const countrySelect = document.getElementById("countrySelect");
    const now = new Date();
    const baseYear = now.getFullYear();

    monthSelect.innerHTML = Array.from({ length: 12 }, (_, i) => {
        const monthDate = new Date(2000, i, 1);
        const label = monthDate.toLocaleString("en", { month: "long" });
        const value = i + 1;
        const selected = value === state.month ? "selected" : "";
        return `<option value="${value}" ${selected}>${label}</option>`;
    }).join("");

    yearSelect.innerHTML = Array.from({ length: 5 }, (_, i) => {
        const value = baseYear - 2 + i;
        const selected = value === state.year ? "selected" : "";
        return `<option value="${value}" ${selected}>${value}</option>`;
    }).join("");

    countrySelect.innerHTML = COUNTRY_NAMES.map((value) => {
        const selected = value === state.country ? "selected" : "";
        return `<option value="${value}" ${selected}>${value}</option>`;
    }).join("");
}

function bindEvents() {
    const monthSelect = document.getElementById("monthSelect");
    const yearSelect = document.getElementById("yearSelect");
    const countrySelect = document.getElementById("countrySelect");
    const refreshBtn = document.getElementById("refreshBtn");

    monthSelect.addEventListener("change", async (event) => {
        state.month = Number(event.target.value);
        await loadPrayerTimes();
    });

    yearSelect.addEventListener("change", async (event) => {
        state.year = Number(event.target.value);
        await loadPrayerTimes();
    });

    countrySelect.addEventListener("change", async (event) => {
        state.country = event.target.value;
        applyCountryCoords(state.country);
        setStatus(`Loading for ${state.country}...`);
        await loadPrayerTimes();
    });

    refreshBtn.addEventListener("click", async () => {
        setStatus("Refreshing location...");
        const hasGeoPermission = await applyLocationWithFallback();
        if (!hasGeoPermission) {
            setStatus(`Location denied. Using ${state.country}.`);
        }
        await loadPrayerTimes();
    });
}

async function loadPrayerTimes() {
    setStatus("Loading prayer times...");

    try {
        state.days = await getPrayerTimes(state.lat, state.lng, state.year, state.month);

        if (!Array.isArray(state.days) || state.days.length === 0) {
            setStatus("No data for selected month.");
            return;
        }

        renderCalendar(state.days);

        const now = new Date();
        const isCurrentMonth = now.getFullYear() === state.year && now.getMonth() + 1 === state.month;
        const dayIndex = isCurrentMonth ? now.getDate() - 1 : 0;
        const day = state.days[Math.max(0, Math.min(dayIndex, state.days.length - 1))];
        renderToday(day);

        setStatus("Updated");
    } catch (error) {
        setStatus("Could not load data.");
        document.getElementById("today").innerHTML = "";
        document.getElementById("calendar").innerHTML = "";
        document.getElementById("nextPrayerInfo").classList.add("d-none");
        console.error(error);
    }
}

async function init() {
    const hasGeoPermission = await applyLocationWithFallback();
    if (!hasGeoPermission) {
        setStatus(`Location denied. Using ${state.country}.`);
    }

    populateSelectors();
    bindEvents();
    await loadPrayerTimes();
}

init();

setInterval(() => {
    loadPrayerTimes();
}, 60000);
