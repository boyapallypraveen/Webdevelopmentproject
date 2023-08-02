document.addEventListener("DOMContentLoaded", function () {
  const addCustomerBtn = document.getElementById("addCustomerBtn");
  const customerFormContainer = document.getElementById("customerFormContainer");
  const customerForm = document.getElementById("customerForm");
  const customerTableContainer = document.getElementById("customerTableContainer");
  const customerTable = document.getElementById("customerTable").getElementsByTagName('tbody')[0];

  // Add customer button click event
  addCustomerBtn.addEventListener("click", function () {
    customerFormContainer.style.display = "block";
    customerTableContainer.style.display = "none";
  });

  // Customer form submission
  customerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const street = document.getElementById("street").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Add customer to the table at the bottom
    addCustomerToTable(firstName, lastName, address, street, city, state, email, phone);

    // Reset the form and hide it
    customerForm.reset();
    customerFormContainer.style.display = "none";
    customerTableContainer.style.display = "block";
  });

  // Example of adding a customer to the table
  function addCustomerToTable(firstName, lastName, address, street, city, state, email, phone) {

    // Check if this is the first row (table headings row)
    if (customerTable.rows.length == 0) {
      const headerRow = customerTable.insertRow();
      headerRow.innerHTML = `
        <th>First Name</th>
        <th>Last Name</th>
        <th>Address</th>
        <th>Street</th>
        <th>City</th>
        <th>State</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Action</th>
      `;
    }
    const newRow = customerTable.insertRow();
    newRow.innerHTML = `
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${address}</td>
      <td>${street}</td>
      <td>${city}</td>
      <td>${state}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>
        <button class="delete">-</button>
        <button class="edit">Pen</button>
      </td>
    `;

    // Add event listener for the edit button
    const editButton = newRow.querySelector(".edit");
    editButton.addEventListener("click", function () {
      showEditController(newRow);
    });

    // Add event listener for the delete button
    const deleteButton = newRow.querySelector(".delete");
    deleteButton.addEventListener("click", function () {
      deleteCustomerFromTable(newRow);
    });
  }

  // Function to show edit controller when the Edit button is clicked
  function showEditController(row) {
    const cells = row.cells;
    for (let i = 0; i < cells.length - 1; i++) {
      const cell = cells[i];
      const value = cell.innerText;
      cell.innerHTML = `<input type="text" value="${value}">`;
    }

    const actionCell = cells[cells.length - 1];
    actionCell.innerHTML = `
      <button class="save">Save</button>
      <button class="cancel">Cancel</button>
    `;

    // Add event listener for the save button
    const saveButton = actionCell.querySelector(".save");
    saveButton.addEventListener("click", function () {
      saveCustomerChanges(row);
    });

    // Add event listener for the cancel button
    const cancelButton = actionCell.querySelector(".cancel");
    cancelButton.addEventListener("click", function () {
      cancelEdit(row);
    });
  }

  // Function to save the changes made during editing
  function saveCustomerChanges(row) {
    const cells = row.cells;
    for (let i = 0; i < cells.length - 1; i++) {
      const cell = cells[i];
      const inputValue = cell.querySelector("input").value;
      cell.innerHTML = inputValue;
    }

    const actionCell = cells[cells.length - 1];
    actionCell.innerHTML = `
      <button class="delete">-</button>
      <button class="edit">Pen</button>
    `;

    // Reattach event listeners for the edit and delete buttons
    const editButton = actionCell.querySelector(".edit");
    editButton.addEventListener("click", function () {
      showEditController(row);
    });

    const deleteButton = actionCell.querySelector(".delete");
    deleteButton.addEventListener("click", function () {
      deleteCustomerFromTable(row);
    });
  }

  // Function to cancel the editing and revert back to the original data
  function cancelEdit(row) {
    const cells = row.cells;
    for (let i = 0; i < cells.length - 1; i++) {
      const cell = cells[i];
      const value = cell.querySelector("input").value;
      cell.innerHTML = value;
    }

    const actionCell = cells[cells.length - 1];
    actionCell.innerHTML = `
      <button class="delete">-</button>
      <button class="edit">Pen</button>
    `;

    // Reattach event listeners for the edit and delete buttons
    const editButton = actionCell.querySelector(".edit");
    editButton.addEventListener("click", function () {
      showEditController(row);
    });

    const deleteButton = actionCell.querySelector(".delete");
    deleteButton.addEventListener("click", function () {
      deleteCustomerFromTable(row);
    });
  }

  // Function to delete a customer from the table
  function deleteCustomerFromTable(row) {
    customerTable.deleteRow(row.rowIndex);
  }
});
