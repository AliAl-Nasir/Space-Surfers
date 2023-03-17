
export const toggleSearchInput = () => {
let days = document.querySelectorAll(".current-month-cell")
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


// 1. Dela ut Id till dag cellerna 

let dayNumber = 1;
days.forEach((day)=> {
    day.id = `day-${dayNumber}`
    dayNumber++ 
  
    day.addEventListener("click", () =>{
        console.log(day.id);
    })
})

}



