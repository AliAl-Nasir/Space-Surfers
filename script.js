// import { addEvent } from "./Events.js";

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
const dateYear = document.querySelector(".date-year");
const prevNextBtn = document.querySelectorAll(".Kalender-container .month-btn");
const main = document.querySelector("main");
const searchInput = document.querySelector("#search-input");
const magniGlass = document.querySelector(".fa-regular");

// init toggles
searchInput.classList.toggle("hide-toggle", true);

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
  //tömmer kalender
  dateContainer.innerHTML = "";

  //anger månad och år
  date.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  //hämtar start och slutdatum för den givna månaden
  const startDate = new Date(currentYear, currentMonth, 1);
  const endDate = new Date(currentYear, currentMonth + 1, 0);
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
  // vår börjar här
  if (date.textContent === `mars ${currentYear}`) {
    main.classList.add("vår");
    main.classList.remove("vinter");
    main.classList.remove("sommar");
    main.classList.remove("höst");
  }
  if (date.textContent === `april ${currentYear}`) {
    main.classList.add("vår");
    main.classList.remove("vinter");
    main.classList.remove("sommar");
    main.classList.remove("höst");
  }
  if (date.textContent === `maj ${currentYear}`) {
    main.classList.add("vår");
    main.classList.remove("vinter");
    main.classList.remove("sommar");
    main.classList.remove("höst");
  }
  // vår slutar här

  // Sommar börjar här
  if (date.innerHTML === `juni ${currentYear}`) {
    main.classList.add("sommar");
    main.classList.remove("vår");
    main.classList.remove("vinter");
    main.classList.remove("höst");
  }
  if (date.innerHTML === `juli ${currentYear}`) {
    main.classList.add("sommar");
    main.classList.remove("vår");
    main.classList.remove("vinter");
    main.classList.remove("höst");
  }
  if (date.innerHTML === `augusti ${currentYear}`) {
    main.classList.add("sommar");
    main.classList.remove("vår");
    main.classList.remove("vinter");
    main.classList.remove("höst");
  }
  // Sommar slutar här

  // hösten börjar här
  if (date.innerHTML === `september ${currentYear}`) {
    main.classList.add("höst");
    main.classList.remove("sommar");
    main.classList.remove("vår");
    main.classList.remove("vinter");
  }
  if (date.innerHTML === `oktober ${currentYear}`) {
    main.classList.add("höst");
    main.classList.remove("sommar");
    main.classList.remove("vår");
    main.classList.remove("vinter");
  }
  if (date.innerHTML === `november ${currentYear}`) {
    main.classList.add("höst");
    main.classList.remove("sommar");
    main.classList.remove("vår");
    main.classList.remove("vinter");
  }
  // hösten slutar här

  // Vintern börjar här
  if (date.innerHTML === `december ${currentYear}`) {
    main.classList.add("vinter");
    main.classList.remove("höst");
    main.classList.remove("vår");
    main.classList.remove("sommar");
  }
  if (date.innerHTML === `januari ${currentYear}`) {
    main.classList.add("vinter");
    main.classList.remove("höst");
    main.classList.remove("vår");
    main.classList.remove("sommar");
  }
  if (date.innerHTML === `februari ${currentYear}`) {
    main.classList.add("vinter");
    main.classList.remove("höst");
    main.classList.remove("vår");
    main.classList.remove("sommar");
  }
  // Vintern slutar här

  function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  //räknar ut midsommardagen
  const june20th = new Date(currentYear, 5, 20);
  const daysUntilSaturday = (6 - june20th.getDay()) % 7;

  //räknar ut Alla helgons dag
  const oct31st = new Date(currentYear, 9, 31);
  const daysUntilSaturdayNovember = (6 - oct31st.getDay()) % 7;

  //Tar reda på om det är söndag
  // let isSunday = new Date (currentMonth ,8)
  // let d =isSunday.getDay()
  // console.log(currentMonth, d)

  function getSundaysInMonth(currentMonth, currentYear) {
    const sundays = [];

    // Skapa ett nytt Date-objekt för den första dagen i månaden
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

    // Loopa igenom alla dagar i månaden
    for (let i = 1; i <= 31; i++) {
      // Skapa ett nytt Date-objekt för den aktuella dagen
      const currentDate = new Date(currentYear, currentMonth, i);

      // Om aktuell dag inte är i samma månad som den första dagen,
      // bryt loopen (detta förhindrar att loopen fortsätter till nästa månad)
      if (currentDate.getMonth() !== currentMonth) {
        break;
      }

      // Om aktuell dag är en söndag, lägg till datumet till arrayen "sundays"
      if (currentDate.getDay() === 0) {
        sundays.push(currentDate);
      }
    }

    return sundays;
  }
  //   console.log(getSundaysInMonth(currentMonth,currentYear));
  // Hämta alla söndagar i maj
  

  //Uträkningen bygger på "Meeus/Jones/Butcher" - Algoritmen

  //G is the "Golden Number" for the year (i.e., the year modulo 19).
  //C is the "Century" (i.e., the year divided by 100, rounded down).
  //H is related to the "Epact" (i.e., the age of the moon on January 1st of the year).
  //I is the number of days between March 21 and the Paschal full moon.
  //J is the weekday of the Paschal full moon (0=Sunday, 1=Monday, etc.).
  //L is the number of days between March 21 and the Sunday on or before the Paschal full moon.
  //month and day are the month and day of Easter, respectively.

  const Easter = getEaster(isLeapYear(currentYear));
  function getEaster(year) {
    let f = Math.floor,
      // Golden Number - 1
      G = year % 19,
      C = f(year / 100),
      // related to Epact
      H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
      // number of days from 21 March to the Paschal full moon
      I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
      // weekday for the Paschal full moon
      J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
      // number of days from 21 March to the Sunday on or before the Paschal full moon
      L = I - J,
      month = 3 + f((L + 40) / 44),
      day = L + 28 - 31 * f(month / 4);

    return [month, day];
  }

  const redDays = [
    new Date(currentYear, 0, 1), // Nyårsdagen
    new Date(currentYear, 0, 6), // trettondagen
    new Date(currentYear, 4, 1), // Första maj
    new Date(currentYear, 5, 6), // Nationaldagen
    new Date(currentYear, 11, 25), // Juldagen
    new Date(currentYear, 11, 26), // Annandag jul
    new Date(currentYear, 5, 20 + daysUntilSaturday), // Midsommardagen
    new Date(currentYear, 9, 31 + daysUntilSaturdayNovember),
    // new Date(currentYear, isSunday), //söndag

    //långfredagen
    new Date(
      currentYear,
      getEaster(currentYear)[0] - 1,
      getEaster(currentYear)[1] - 2
    ),
    //Påskdagen
    new Date(
      currentYear,
      getEaster(currentYear)[0] - 1,
      getEaster(currentYear)[1] - 0
    ),
    //Annandag påsk
    new Date(
      currentYear,
      getEaster(currentYear)[0] - 1,
      getEaster(currentYear)[1] + 1
    ),
    // Kristi himmelsfärdsdag
    new Date(
      currentYear,
      getEaster(currentYear)[0] - 1,
      getEaster(currentYear)[1] + 39
    ),
    //Pingst
    new Date(
      currentYear,
      getEaster(currentYear)[0] - 1,
      getEaster(currentYear)[1] + 49
    ),
    new Date(getSundaysInMonth(0, 2023)),
  ];

  const sundaysInJan = getSundaysInMonth(0, currentYear);
  const sundaysInFeb = getSundaysInMonth(1, currentYear);
  const sundaysInMar = getSundaysInMonth(2, currentYear);
  const sundaysInApr = getSundaysInMonth(3, currentYear);
  const sundaysInMay = getSundaysInMonth(4, currentYear);
  const sundaysInJune = getSundaysInMonth(5, currentYear);
  const sundaysInJuli = getSundaysInMonth(6, currentYear);
  const sundaysInAug = getSundaysInMonth(7, currentYear);
  const sundaysInSep = getSundaysInMonth(8, currentYear);
  const sundaysInOkt = getSundaysInMonth(9, currentYear);
  const sundaysInNov = getSundaysInMonth(10, currentYear);
  const sundaysInDec = getSundaysInMonth(11, currentYear);

  // Lägg till alla söndagar i arrayen "redDays"
//   redDays.push(...sundaysInJan,
//      ...sundaysInFeb, 
//      ...sundaysInMar, 
//      ...sundaysInApr, 
//      ...sundaysInMay,
//      ...sundaysInJune,
//      ...sundaysInJuli,
//      ...sundaysInAug
     
    
//     );

  // Loopar över varje datumcell
  dayOfMonth.forEach((cell) => {
    // Hämtar datumet för den aktuella cellen
    const cellDate = new Date(
      currentYear,
      currentMonth,
      parseInt(cell.textContent)
    );
    // Kollar om cellens datum finns i listan med röda dagar
    if (
      redDays.some(
        (redDay) => redDay.toDateString() === cellDate.toDateString()
      )
    ) {
      cell.classList.add("red-day");
    } else {
      cell.classList.remove("red-day");
    }
  });
}

magniGlass.addEventListener("click", () => {
  searchInput.classList.toggle("hide-toggle");
  searchInput.focus();
});
