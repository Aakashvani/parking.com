let entries = JSON.parse(localStorage.getItem("entries")) || [];

//Entry Represent each entry in the parking lot
const Entry = (owner, car, licensePlate, entryDate, exitDate) => {
    return {
        owner: owner,
        car: car,
        licensePlate: licensePlate,
        entryDate: entryDate,
        exitDate: exitDate,
    };
};

const showAlert = (message, className) => {
    const div = document.createElement("div");
    div.className = `alert alert-${className} w-50 mx-auto`;
    div.appendChild(document.createTextNode(message));
    const formContainer = document.querySelector(".form-container");
    const form = document.querySelector("#entryForm");
    formContainer.insertBefore(div, form);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
};

const validateInputs = () => {
    const owner = document.querySelector("#owner").value;
    const car = document.querySelector("#car").value;
    const licensePlate = document.querySelector("#licensePlate").value;
    const entryDate = document.querySelector("#entryDate").value;
    const exitDate = document.querySelector("#exitDate").value;
    var licensePlateRegex =
        /^(?:[A-Z]{2}-\d{2}-\d{2})|(?:\d{2}-[A-Z]{2}-\d{2})|(?:\d{2}-\d{2}-[A-Z]{2})$/;
    if (
        owner === "" ||
        car === "" ||
        licensePlate === "" ||
        entryDate === "" ||
        exitDate === ""
    ) {
        showAlert("All fields must me filled!", "danger");
        return false;
    }
    if (exitDate < entryDate) {
        showAlert("Exit Date cannot be lower than Entry Date", "danger");
        return false;
    }
    let unix = Date.now();
    let date = new Date(unix);
    date = date.getDate();

    let entryDatetoday = entryDate.split("-")[ 2 ];
    entryDatetoday = Number(entryDatetoday);

    if (entryDatetoday < date) {
        showAlert("Entry Date cannot be lower than Today", "danger");
        return false;
    }

    for (let i = 0; i < entries.length; i++) {
        console.log('licensePlate',licensePlate,entries[ i ].licensePlate)
        if (licensePlate === entries[ i ].licensePlate) {
            showAlert(`${licensePlate} Car has already parked`, "danger");
            return false;
        }
    }

    return true;
};

//Event Add
document.querySelector("#entryForm").addEventListener("submit", (e) => {
    e.preventDefault();

    //Declare Variables
    const owner = document.querySelector("#owner").value;
    const car = document.querySelector("#car").value;
    const licensePlate = document.querySelector("#licensePlate").value;
    const entryDate = document.querySelector("#entryDate").value;
    const exitDate = document.querySelector("#exitDate").value;

    if (!validateInputs()) {
        return;
    }
    //Instatiate Entry
    const entry = Entry(owner, car, licensePlate, entryDate, exitDate);

    entries.push(entry);
    addEntries(entries);

    showAlert("Car successfully added to the parking lot", "success");

    clearInput();
});

const addEntries = (entries) => {
    localStorage.setItem("entries", JSON.stringify(entries));
};

function clearInput() {
    const inputs = document.querySelectorAll(".form-control");
    inputs.forEach((input) => (input.value = ""));
}
