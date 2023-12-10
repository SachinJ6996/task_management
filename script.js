var selectedRow = null;

// to show alerts 
function showAlert(message, className) {
    const div = document.createElement("div")
    div.className = `alert alert-${className}`

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// to clear all fields
function clearField() {
    document.querySelector("#taskName").value = "";
    document.querySelector("#taskDescription").value = "";
    document.querySelector("#taskNumber").value = "";

}

// to add data
document.querySelector("#task-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // get form values
    const taskName = document.querySelector("#taskName").value;
    const taskDescription = document.querySelector("#taskDescription").value;
    const taskNumber = document.querySelector("#taskNumber").value;

    //validation 
    if (taskName == "" || taskDescription == "" || taskNumber == "") {
        showAlert("No field can be empty", "danger");
    } else {
        if (selectedRow == null) {
            const list = document.querySelector("#task-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${taskName}</td>
            <td>${taskDescription}</td>
            <td>${taskNumber}</td>
            <td>
            <a href="#" class="btn btn-outline-light btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
            <td>
            <input type="checkbox" id="myCheckbox" name="myCheckbox">
                                <label for="myCheckbox">My Checkbox</label>  
            </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Task Added", "success");
        }
        else {
            selectedRow.children[0].textContent = taskName;
            selectedRow.children[1].textContent = taskDescription;
            selectedRow.children[2].textContent = taskNumber;
            selectedRow = null;
            showAlert("Task info edited", "info");
        }

        clearField();

    }

});

// to edit data
document.querySelector("#task-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
       document.querySelector("#taskName").value = selectedRow.children[0].textContent;
       document.querySelector("#taskDescription").value = selectedRow.children[1].textContent;
       document.querySelector("#taskNumber").value = selectedRow.children[2].textContent;
    }
})



// to delete task 
document.querySelector("#task-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Task data deleted", "danger");
    }
});

