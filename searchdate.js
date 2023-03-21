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
const calenderInput = document.querySelector("#search-input");

const toggleSearchInput = () => {
    // init toggles
    // searchInput.classList.toggle("hide-toggle", );

    magniGlass.addEventListener("click", () => {
        // searchInput.classList.toggle("hide-toggle");
        searchInput.focus();
    });
};

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

    // vår börjar här
    if (month === 2 || month === 3 || month === 4) {
        main.classList.add("vår");
        main.classList.remove("vinter");
        main.classList.remove("sommar");
        main.classList.remove("höst");
    }
    // if (month === 3 ) {
    //   main.classList.add("vår");
    //   main.classList.remove("vinter");
    //   main.classList.remove("sommar");
    //   main.classList.remove("höst");
    // }
    // if (month === 4 ) {
    //   main.classList.add("vår");
    //   main.classList.remove("vinter");
    //   main.classList.remove("sommar");
    //   main.classList.remove("höst");
    // }
    // vår slutar här

    // Sommar börjar här
    if (month === 5) {
        main.classList.add("sommar");
        main.classList.remove("vår");
        main.classList.remove("vinter");
        main.classList.remove("höst");
    }
    if (month === 6) {
        main.classList.add("sommar");
        main.classList.remove("vår");
        main.classList.remove("vinter");
        main.classList.remove("höst");
    }
    if (month === 7) {
        main.classList.add("sommar");
        main.classList.remove("vår");
        main.classList.remove("vinter");
        main.classList.remove("höst");
    }
    // Sommar slutar här

    // hösten börjar här
    if (month === 8) {
        main.classList.add("höst");
        main.classList.remove("sommar");
        main.classList.remove("vår");
        main.classList.remove("vinter");
    }
    if (month === 9) {
        main.classList.add("höst");
        main.classList.remove("sommar");
        main.classList.remove("vår");
        main.classList.remove("vinter");
    }
    if (month === 10) {
        main.classList.add("höst");
        main.classList.remove("sommar");
        main.classList.remove("vår");
        main.classList.remove("vinter");
    }
    // hösten slutar här

    // Vintern börjar här
    if (month === 11) {
        main.classList.add("vinter");
        main.classList.remove("höst");
        main.classList.remove("vår");
        main.classList.remove("sommar");
    }
    if (month === 0) {
        main.classList.add("vinter");
        main.classList.remove("höst");
        main.classList.remove("vår");
        main.classList.remove("sommar");
    }
    if (month === 1) {
        main.classList.add("vinter");
        main.classList.remove("höst");
        main.classList.remove("vår");
        main.classList.remove("sommar");
    }
    // Vintern slutar här
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

export { idGenerator, toggleSearchInput, updateIds, changeDates };
export { calenderInput };
export { dateObject };
