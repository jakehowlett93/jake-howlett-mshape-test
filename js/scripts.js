let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();
let monthYear = document.getElementById("month-year");
let timeSlot;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let eventObj = {
  "2day10am": "Gym Sesh",
  "2day15pm": "Doctors",
  "2day23pm": "Keyboard lesson",
  "2day27pm": "Pub Sesh"
};

showCalendar(currentMonth, currentYear);

function saveEvent() {
  let newEvent = document.getElementById("event-input").value;
  let cellId = document.getElementsByClassName("selected-cell").item(0).id;
  eventObj[cellId] = newEvent;
  document.getElementById(cellId).classList.add("has-event");
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  //generates the calendar
  monthYear.innerHTML = months[month] + " " + year;
  let firstDay = new Date(year, month, 0).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();
  let calendarBody = document.getElementById("calendar-body");
  calendarBody.innerHTML = "";
  let dateCounter = 1;

  for (let i = 0; i < 6; i++) {
    //loops round rows of the calendar
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      //loops round the columns of the calendar
      if (dateCounter > 42) {
        break;
      } else if (i === 0 && j < firstDay) {
        //create empty cells until it reaches first day of the month
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (dateCounter > daysInMonth) {
        //create empty cells after the last day of the month
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else {
        //fill each cell with the date and am / pm timeslots
        let cell = document.createElement("td");
        cell.classList.add("cell", "cell-text-align");
        cell.style.padding = 0;
        //TODO move this to CSS, currently i cant get the style to apply in CSS, i think its a
        //specificity issue with bootstrap but i cant work out how to fix it
        let cellText = document.createTextNode(dateCounter);

        cell.appendChild(cellText);

        for (let k = 0; k < 2; k++) {
          if (k % 2 === 0) {
            timeSlot = "am";
          } else {
            timeSlot = "pm";
          }
          let cellTimeSlot = document.createElement("div");
          cellTimeSlot.innerHTML = timeSlot;
          cellTimeSlot.id = month + "day" + dateCounter + timeSlot;
          cellTimeSlot.classList.add("hide-slot");
          cell.appendChild(cellTimeSlot);
          if (eventObj[cellTimeSlot.id]) {
            cellTimeSlot.classList.add("has-event");
          }
        }

        cell.id = month + "day" + dateCounter;
        if (cell.id === month + "day" + currentDay) {
          cell.classList.add("today");
        }
        row.appendChild(cell);
        dateCounter++;
      }
    }
    calendarBody.appendChild(row);
  }

  //

  document
    .getElementById("calendar-body")
    .addEventListener("click", function(e) {
      selectedCellArray = document.getElementsByClassName("selected-cell");
      if (selectedCellArray.length > 0) {
        for (let item of selectedCellArray) {
          item.classList.remove("selected-cell");
        }
      }
      e.target.classList.add("selected-cell");
      document.getElementById("event-display").style.display = "initial";
      let eventId = e.target.id;
      let eventInput = document.getElementById("event-input");
      if (eventObj[eventId]) {
        eventInput.value = eventObj[eventId];
      } else {
        eventInput.value = "";
      }
    });
}