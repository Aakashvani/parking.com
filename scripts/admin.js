//Handle Local Storage
let entries = JSON.parse(localStorage.getItem("entries")) || [];

if (entries) {
//   console.log("entr", entries);
  displayTable(entries);
}

const removeEntries = (licensePlate) => {
  entries.forEach((entry, index) => {
    if (entry.licensePlate === licensePlate) {
      entries.splice(index, 1);
    }
  });
//   console.log("entr", entries);

  localStorage.setItem("entries", JSON.stringify(entries));

};

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
                           `;
    tableBody.appendChild(row);
  }
}

function deleteEntry(target) {
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
  }
}

//Event Remove
document.querySelector("#tableBody").addEventListener("click", (e) => {
  console.log("e", e);

  //Call to UI function that removes entry from the table
  deleteEntry(e.target);
  //Get license plate to use as unique element of an entry
  var licensePlate =
    e.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent;
  //Call to removeEntries function to remove entry from the local storage
  removeEntries(licensePlate);
  //Show alert that entry was removed
  showAlert("Car successfully removed from the parking lot list", "success");
});

//Event Search
document
  .querySelector("#searchInput")
  .addEventListener("keyup", function searchTable() {
    const searchValue = document
      .querySelector("#searchInput")
      .value.toUpperCase();

    const tableLine = document
      .querySelector("#tableBody")
      .querySelectorAll("tr");

    for (let i = 0; i < tableLine.length; i++) {
      var count = 0;

      const lineValues = tableLine[i].querySelectorAll("td");

      for (let j = 0; j < lineValues.length - 1; j++) {
        if (lineValues[j].innerHTML.toUpperCase().startsWith(searchValue)) {
          count++;
        }
      }
      if (count > 0) {
        tableLine[i].style.display = "";
      } else {
        tableLine[i].style.display = "none";
      }
    }
  });
