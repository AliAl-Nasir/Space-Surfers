// Lista med månader
const monthNames = [
    "januari",
    "februari",
    "mars",
    "april",
    "maj",
    "juni",
    "juli",
    "augusti",
    "september",
    "oktober",
    "november",
    "december",
];

//hämta element från DOM
const dateContainer = document.querySelector(".date-container");
const date = document.querySelector(".date");
const nextMonthButton = document.querySelector(".next-month-btn");
const prevMonthButton = document.querySelector(".previous-month-btn");

//hämta datum
let currentDate = new Date();
//ligger en dag fel just nu
// .toLocaleString("en-US", { timeZone: "CET" });
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

generateDates();

//klick för kanapparna att byta månad
nextMonthButton.addEventListener("click", () => {
    console.log("Next month button clicked");
    // öka månad med ett steg
    currentMonth++;
    //om månaden är december (11) nollställ till januari (0) och öka årtalet med 1
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    //skapa kalender för den aktuella månaden
    generateDates();
});

//samma fast tvärtemot den andra knappen
prevMonthButton.addEventListener("click", () => {
    console.log("Previous month button clicked");
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateDates();
});

//skapar en kalender för en given månad och år
function generateDates() {
    console.log("Generating dates...");
    console.log("Current month:", currentMonth);
    console.log("Current year:", currentYear);
    //tömmer kalender
    dateContainer.innerHTML = "";
    //anger månad och år
    date.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    //hämtar start och slutdatum för den givna månaden
    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0);
    //Hämtar vilken veckodag som matchar startdatum för månaden
    const startDay = startDate.getDay();
    // lägger till tomma rutor för startdatum
    for (let i = 0; i < startDay; i++) {
        const blankCell = document.createElement("div");
        blankCell.classList.add("date-cell", "blankcell");
        dateContainer.appendChild(blankCell);
    }
    //lägger till alla celler för respektive datum och eventuella tomma celler
    while (currentDate <= endDate) {
        // console.log("Current date:", currentDate);
        const dateCell = document.createElement("div");
        dateCell.textContent = currentDate.getDate();
        dateContainer.appendChild(dateCell);
        currentDate.setDate(currentDate.getDate() + 1);
    }
}
