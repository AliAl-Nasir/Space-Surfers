const prevNextBtn = document.querySelectorAll(".Kalender-container .month-btn");
const date = document.querySelector(".date");
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let dayIds = [];

const toggleSearchInput = () => {
    const searchInput = document.querySelector("#search-input");
    const magniGlass = document.querySelector(".fa-regular");
    const calenderInput = document.querySelector("#search-input")
    
    // init toggles
    searchInput.classList.toggle("hide-toggle", true);
    
    magniGlass.addEventListener("click", () => {
        searchInput.classList.toggle("hide-toggle");
        searchInput.focus();
    });
    
    calenderInput.addEventListener("input",(e) =>{
        let date = calenderInput.valueAsDate;
        console.log(date);
    })
    
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
      updateIds()
      idGenerator()
    });
  });
  


export { idGenerator, toggleSearchInput, updateIds}