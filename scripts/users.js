//Handle Local Storage
let entries = JSON.parse(localStorage.getItem("entries")) || [];

if (entries) {
    displayTable(entries);
}

const showAlert = (message, className) => {
    const div = document.createElement("div");
    div.className = `alert alert-${className} w-50 mx-auto`;
    div.appendChild(document.createTextNode(message));
    const tableContainer = document.querySelector(".table-container");
    const form = document.querySelector("#entryForm");
    tableContainer.insertBefore(div, form);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
};

//Event Display
function displayTable(entries) {
    const tableBody = document.querySelector("#tableBody");
    entries.map((entry) => addEntryToTable(entry));

    function addEntryToTable(entry) {
        const row = document.createElement("tr");

        row.innerHTML = `   <td>${entry.owner}</td>
                               <td>${entry.car}</td>
                               <td>${entry.licensePlate}</td>
                               <td>${entry.entryDate}</td>
                               <td>${entry.exitDate}</td>
                               <td><button class="btn btn-danger delete">X</button></td>
                               <td><button class="btn btn-dark edit"> edit</button></td>

                           `;
        tableBody.appendChild(row);
    }
}

//update Event &  entry form
let updatefrom = document.querySelector("#updatefrom");
const updateEntries = (licensePlate) => {
    updatefrom.innerHTML = null;
    updatefrom = document.querySelector("#updatefrom");
    //create elements
    const row = document.createElement("div");
    const col1 = document.createElement("div");
    const col2 = document.createElement("div");
    const entryDate = document.createElement("label");
    const exitDate = document.createElement("label");
    const Entry = document.createElement("input");
    const Exit = document.createElement("input");
    const btn = document.createElement("button");

    //className
    row.className = "row w-50 mx-auto";
    col1.className = "col-6";
    col2.className = "col-6";
    Entry.className = "form-control rounded-10 shadow-sm";
    Exit.className = "form-control rounded-10 shadow-sm";
    btn.className = "btn mx-auto d-block mt-5 rounded-10 shadow btn-dark";
    Entry.id = "entryDate";
    Exit.id = "exitDate";
    //InnerHtml
    entryDate.innerHTML = "Entry Date:";
    exitDate.innerHTML = "Exit Date:";
    btn.innerHTML = "Update";
    btn.type = "submit";
    Entry.type = "date";
    Exit.type = "date";

    //event
    document.querySelector("#updatefrom").addEventListener("submit", (e) => {
        e.preventDefault();

        let exitDate = document.querySelector("#exitDate").value;
        let entryDate = document.querySelector("#entryDate").value;

        let unix = Date.now();
        let date = new Date(unix);
        date = date.getDate();

        let entryDatetoday = entryDate.split("-")[ 2 ];
        entryDatetoday = Number(entryDatetoday);
        if (entryDate === "" || exitDate === "") {
            return showAlert("Please choose Entry and Exit Date", "warning");
        } else if (exitDate < entryDate) {
            showAlert("Exit Date cannot be lower than Entry Date", "danger");
            return;
        } else if (entryDatetoday < date) {
            return showAlert("Entry Date cannot be lower than Today", "danger");
        } else {
            for (let i = 0; i < entries.length; i++) {
                if (licensePlate === entries[ i ].licensePlate) {
                    entries[ i ].entryDate = entryDate;
                    entries[ i ].exitDate = exitDate;
                    break;
                }
            }

            localStorage.setItem("entries", JSON.stringify(entries));
            //Show alert that entry was removed
            showAlert(
                `Dates successfully updated for the ${licensePlate} licensePlate`,
                "success"
            );
        }
        setTimeout(() => location.reload(), 3000);
    });

    //append
    col1.append(entryDate, Entry);
    col2.append(exitDate, Exit);
    row.append(col1, col2, btn);

    updatefrom.append(row);
};

//UpdateEntries

//Event Remove
document.querySelector("#tableBody").addEventListener("click", (e) => {
    //Call to UI function that removes entry from the table
    deleteEntry(e.target);
    //Get license plate to use as unique element of an entry
    var licensePlate =
        e.target.parentElement.previousElementSibling.previousElementSibling
            .previousElementSibling.textContent;
    //Call to removeEntries function to remove entry from the local storage
    removeEntries(licensePlate);
});

const removeEntries = (licensePlate) => {
    entries.forEach((entry, index) => {
        if (entry.licensePlate === licensePlate) {
            entries.splice(index, 1);
        }
    });

    showAlert(
        `${licensePlate} successfully removed from the parking lot list`,
        "success"
    );
    setTimeout(() => location.reload(), 3000);

    localStorage.setItem("entries", JSON.stringify(entries));
    //Show alert that entry was removed
};

function deleteEntry(target) {
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
    }
}

function deleteEntry(target) {
    if (target.classList.contains("edit")) {
        let licensePlate =
            target.parentElement.previousElementSibling.previousElementSibling
                .previousElementSibling.previousElementSibling.textContent;

        updateEntries(licensePlate);
    }
}
