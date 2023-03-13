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
const prevNextBtn = document.querySelectorAll(".Kalender-container .month-btn");
//hämta datum
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

generateDates();

prevNextBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        currentMonth = btn.id === "prev" ? currentMonth - 1 : currentMonth + 1;
        // om aktuell månad är mindre än 0 eller större än 11
        if (currentMonth < 0 || currentMonth > 11) {
            currentDate = new Date(currentYear, currentMonth);
            currentYear = currentDate.getFullYear(); // Uppdaterar år
            currentMonth = currentDate.getMonth(); // Uppdaterar månad
        } else {
            currentDate = new Date();
        }
        generateDates();
    });
});

//skapar en kalender för en given månad och år
function generateDates() {
    //Hämta datumen för föregående och kommande månad
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const previousMonthEndDate = new Date(previousYear, previousMonth);
    const previousMonthEndDay = previousMonthEndDate.getDay();
    const previousMonthStartDate = new Date(
        previousYear,
        previousMonth,
        1 - previousMonthEndDay - 1
    );

    //tömmer kalender
    dateContainer.innerHTML = "";
    //anger månad och år
    date.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    //hämtar start och slutdatum för den givna månaden
    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0);
    //Hämtar vilken veckodag som matchar start/slutdatum för månaden
    const startDay = (startDate.getDay() - 1 + 7) % 7;
    const endDay = (endDate.getDay() - 1 + 7) % 7;

    //lägger till datum från föregående månad
    for (let i = 0; i < startDay; i++) {
        const previousMonthDateCell = document.createElement("div");
        previousMonthDateCell.textContent =
            previousMonthStartDate.getDate() + i;
        previousMonthDateCell.classList.add("date-cell", "previous-month-cell");
        dateContainer.appendChild(previousMonthDateCell);
    }

    let currentDate = new Date(startDate);
    //lägger till alla celler för respektive datum och eventuella tomma celler
    while (currentDate <= endDate) {
        const dateCell = document.createElement("div");
        dateCell.textContent = currentDate.getDate();
        dateCell.classList.add("date-cell", "current-month-cell");
        dateContainer.appendChild(dateCell);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    //lägger till datum från kommande månad
    for (let i = 1; i <= 6 - endDay; i++) {
        const nextMonthDateCell = document.createElement("div");
        nextMonthDateCell.textContent = i;
        nextMonthDateCell.classList.add("date-cell", "next-month-cell");
        dateContainer.appendChild(nextMonthDateCell);
    }

    //itererar över månaden och väljer ut "idag" och ger klassen current-date
    const today = new Date();
    const dateCells = document.querySelectorAll(".date-cell");
    const dayOfMonth = document.querySelectorAll(".current-month-cell");
    dateCells.forEach((cell) => {
        const cellDate = new Date(
            currentYear,
            currentMonth,
            parseInt(cell.textContent)
        );
        if (cellDate.toDateString() === today.toDateString()) {
            cell.classList.add("current-date");
        } else {
            cell.classList.remove("current-date");
        }
    });

    // Exempel på en lista med röda dagar
const redDays = [
    new Date(currentYear, 0, 1),  // Nyårsdagen
    new Date(currentYear, 3, 30), // Långfredagen
    new Date(currentYear, 4, 1),  // Första maj
    new Date(currentYear, 5, 6),  // Nationaldagen
    new Date(currentYear, 5, 25), // Midsommardagen
    new Date(currentYear, 11, 24),// Julafton
    new Date(currentYear, 11, 25),// Juldagen
    new Date(currentYear, 11, 26),// Annandag jul
];


// Loopar över varje datumcell
    dayOfMonth.forEach((cell) => {
    // Hämtar datumet för den aktuella cellen
    const cellDate = new Date(
        currentYear,
        currentMonth,
        parseInt(cell.textContent)
    );
    // Kollar om cellens datum finns i listan med röda dagar
    if (redDays.some(redDay => redDay.toDateString() === cellDate.toDateString())) {
        cell.classList.add("red-day");
    } else {
        cell.classList.remove("red-day");
    }
});
}




