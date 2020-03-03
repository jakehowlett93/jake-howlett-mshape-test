let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let monthYear = document.getElementById("month-year");

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



showCalendar(currentMonth, currentYear);

function showCalendar(month, year) {
    monthYear.innerHTML = months[month] + " " + year;
    let firstDay = new Date(year, month).getDate();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = "";
    let date = 1;


    for(let i = 0; i < 6; i++) {
        //loops round rows of the calendar
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            //loops along the columns of the calendar
            if(i === 0 && j < firstDay) {
                //empty cells until it reaches first day of the month
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell)
            } else if( date > daysInMonth) {
                break;
            } else {
                //fill each cell with the date
                let cell = document.createElement("td");
                let cellText= document.createTextNode(date);
                cell.appendChild(cellText);
                cell.id = "day"+date
                row.appendChild(cell);
            }
            date++;
        }
        calendarBody.appendChild(row);
    }

    document.getElementById("calendar-body").addEventListener("click", function(e) {
        console.log(e.target.id); //TODO remove this
        if(e.target.id) {
            for(let i = 1; i < daysInMonth; i++) {
                document.getElementsByTagName("td")[i].style.background = "";
            }
            e.target.style.backgroundColor = 'rgb(150, 223, 215)';
            document.getElementById("event-display").style.display = "initial"
        }
    })
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