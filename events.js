// export { addEvent };

//function addEvent() {
const dateCells = document.querySelectorAll(".date-cell");
const datecell = document.querySelector(".current-month-cell");
//const mainContainer = document.querySelector(".main-container"); vart den  html element kommer ifrån

dateCells.forEach((dateCell) => {
    dateCell.addEventListener("click", () => {
        console.log(dateCell, "click datecell");
        const createEventContainer = document.createElement("section");
        createEventContainer.className = "event-container";

        mainContainer.appendChild(createEventContainer);

        //lägga till elementet, till höger på stor skärm, under på mindre.
    });
});

// addEvent();

//om en ruta är öppen så kan man inte öppna en til. max en åt gången. om man har en öppen för tex den 9:e och klickar 9:E igen ska inget hända. om man däremot klickar på tex 10:e ska den 9:e släckas ned och den 10: ska öppnas upp.

// if (createEventContainer === something) {
