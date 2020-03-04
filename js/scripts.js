let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDay();
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
]

let eventObj = {
    "2day10am" : "Gym Sesh",
    "2day15pm" : "Doctors",
    "2day23pm" : "keyboard lesson",
    "2day27pm" : "Pub Sesh"
}



showCalendar(currentMonth, currentYear);


function showCalendar(month, year) {
    //generates the calendar
    monthYear.innerHTML = currentDay + " " + months[month] + " " + year;
    let firstDay = new Date(year, month, 0).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = "";
    let dateCounter = 1;



    for(let i = 0; i < 6; i++) {
        //loops round rows of the calendar
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            //loops round the columns of the calendar
            if(i === 0 && j < firstDay) {
                //create empty cells until it reaches first day of the month
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell)
            } else if( dateCounter > daysInMonth) {
                break;
            } else {
                //fill each cell with the date and am / pm timeslots
                let cell = document.createElement("td");
                cell.classList.add("cell", "center-align")
                let cellText = document.createTextNode(dateCounter);
                cell.appendChild(cellText)
                for(let k = 0; k < 2; k++) {    
                    if( k % 2 === 0) {
                        timeSlot = "am"
                    } else {
                        timeSlot = "pm"
                    }
                    let cellButton = document.createElement("div");
                    cellButton.innerHTML = timeSlot
                    cellButton.id = month+"day"+dateCounter+timeSlot 
                    cell.appendChild(cellButton);
                    if (eventObj[cellButton.id]) {
                        cellButton.classList.add("has-event")
                    }
                }
                cell.id = month+"day"+dateCounter
                row.appendChild(cell);
                dateCounter++
            }            
        }
        calendarBody.appendChild(row);
    };

    //

    document.getElementById("calendar-body").addEventListener("click", function(e) {
        selectedCellArray = document.getElementsByClassName("selected-cell");
        if(selectedCellArray.length > 0) {
            for (let item of selectedCellArray) {
                item.classList.remove("selected-cell");
            }
        }
        e.target.classList.add("selected-cell");
        document.getElementById("event-display").style.display = "initial" //TODO remove inline css
        let eventId =e.target.id
        let eventInput = document.getElementById("event-input")
        if(eventObj[eventId]) {
            eventInput.value = eventObj[eventId]
        } else {
            eventInput.value = ""
            eventObj.eventId = document.getElementsByName("update-event").value
        }
    });

}

function saveEvent() {
    let newEvent = document.getElementById("event-input").value;
    let cellId = document.getElementsByClassName("selected-cell").item(0).id;
    eventObj.cellId = newEvent
    console.log(eventObj.cellId)
}


function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; 
    showCalendar(currentMonth, currentYear)
}

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
    showCalendar(currentMonth, currentYear)
}