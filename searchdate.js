import { dateContainer } from "./script.js";
import { monthNames } from "./script.js";

const main = document.querySelector("main");
const prevNextBtn = document.querySelectorAll(".Kalender-container .month-btn");
const date = document.querySelector(".date");
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let dayIds = [];

const dateObject = { currentDate, currentMonth, currentYear };

const searchInput = document.querySelector("#search-input");
const magniGlass = document.querySelector(".fa-regular");
const searchBox = document.querySelector(".search");
const calenderInput = document.querySelector("#search-input");

magniGlass.addEventListener("click", (event) => {
    searchBox.classList.toggle("active");
    event.stopPropagation();
});

calenderInput.addEventListener("change", function () {
    let selectedDate = new Date(this.value);
    dateObject.currentDate = selectedDate;
    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth();
    dateObject.currentMonth = month;
    dateObject.currentYear = year;

    changeDates(year, month);
});

function changeDates(year, month) {
    console.log(year, month);
    //tömmer kalender
    dateContainer.innerHTML = "";

    //anger månad och år
    document.getElementById(
        "search-input"
    ).textContent = `${monthNames[month]} ${year}`;
    date.textContent = `${monthNames[month]} ${year}`;

    //hämtar start och slutdatum för den givna månaden
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    //Ändrar så att måndag är första dag i veckan
    const startDay = (startDate.getDay() - 1 + 7) % 7;

    //lägger till tomma celler innan månaden
    for (let i = 0; i < startDay; i++) {
        const previousMonthDateCell = document.createElement("div");
        previousMonthDateCell.classList.add("date-cell", "blank-cell");
        dateContainer.appendChild(previousMonthDateCell);
    }

    let currentDate = new Date(startDate);
    //lägger till alla celler för respektive datum och eventuella tomma celler i slutet
    while (currentDate <= endDate) {
        const dateCell = document.createElement("div");
        dateCell.textContent = currentDate.getDate();
        dateCell.classList.add("date-cell", "current-month-cell");

        dateContainer.appendChild(dateCell);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    //itererar över månaden och väljer ut "idag" och ger klassen current-date
    const today = new Date();
    const dateCells = document.querySelectorAll(".date-cell");
    dateCells.forEach((cell) => {
        const cellDate = new Date(
            dateObject.currentYear,
            dateObject.currentMonth,
            parseInt(cell.textContent)
        );
        if (cellDate.toDateString() === today.toDateString()) {
            cell.classList.add("current-date");
        } else {
            cell.classList.remove("current-date");
        }
    });

    // vårtema
    if (month === 2 || month === 3 || month === 4) {
        main.classList.add("vår");
        main.classList.remove("vinter");
        main.classList.remove("sommar");
        main.classList.remove("höst");
    }

    // Sommartema
    if (month === 5 || month === 6 || month === 7) {
        main.classList.add("sommar");
        main.classList.remove("vår");
        main.classList.remove("vinter");
        main.classList.remove("höst");
    }

    // hösttema
    if (month === 8 || month === 9 || month === 10) {
        main.classList.add("höst");
        main.classList.remove("sommar");
        main.classList.remove("vår");
        main.classList.remove("vinter");
    }

    // Vintertema
    if (month === 11 || month === 0 || month === 1) {
        main.classList.add("vinter");
        main.classList.remove("höst");
        main.classList.remove("vår");
        main.classList.remove("sommar");
    }
}

const idGenerator = () => {
    let days = document.querySelectorAll(".current-month-cell");
    let dayNumber = 1;
    days.forEach((day) => {
        let dayId = `${dayNumber} ${date.textContent} `;
        day.dataset.id = dayId; // Sätt ID:t som ett data-attribut
        dayIds.push(dayId); // Spara ID:t i arrayen
        dayNumber++;

        day.addEventListener("click", () => {
            console.log(dayId); // Logga ID:t från data-attributet
        });
    });
};

const updateIds = () => {
    let days = document.querySelectorAll(".current-month-cell");
    for (let i = 0; i < days.length; i++) {
        days[i].dataset.id = dayIds[i];
    }
};

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
        updateIds();
        idGenerator();
    });
});

export { idGenerator, updateIds, changeDates };
export { dateObject };
