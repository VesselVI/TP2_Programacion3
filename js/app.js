const dataTable = document.querySelector(".listData")
let allTasks = [];

async function getUsers() {
    try {
        const response = await axios.get("http://localhost:3000/tasks");

        allTasks = response.data;
        const tasks = response.data;

        let row = "";

        tasks.forEach((task, index) => {
            row += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${task.note}</td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-secondary  btn-sm dropdown-toggle statusBtn" type="button"
                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        ${task.status}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Pendiente</a>
                        <a class="dropdown-item" href="#">En progreso</a>
                        <a class="dropdown-item" href="#">Completado</a>
                    </div>
                </div>
            </td>
            <td>${task.exp_Date}</td>
            <td> <button type="button" class="btn btn-light" id="editBtn">Editar</button></td>
            <td><i class='bx bxs-trash bx-sm' id="deleteBtn"></i></td>
        </tr>
        `
        })

        dataTable.insertAdjacentHTML("beforeend", row);

    } catch (error) {
        console.log(error);
    }


}




function updateStatusButton(button, selectedText) {
    button.textContent = selectedText;
    button.classList.remove("btn-secondary", "btn-danger", "btn-success");

    if (selectedText === "Pendiente") {
        button.classList.add("btn-secondary");
    } else if (selectedText === "En progreso") {
        button.classList.add("btn-danger");
    } else if (selectedText === "Completado") {
        button.classList.add("btn-success");
    }
}

if (dataTable) {
    dataTable.addEventListener("click", (event) => {
        const item = event.target.closest(".dropdown-item");
        if (!item) return;

        event.preventDefault();
        const selectedText = item.textContent.trim();
        const dropdown = item.closest(".dropdown");
        const button = dropdown.querySelector(".statusBtn");

        updateStatusButton(button, selectedText);
    });
}


dataTable.addEventListener("click", async (event) => {
    if (event.target.id === "deleteBtn") {
        const row = event.target.closest("tr");
        const rowIndex = Array.from(dataTable.querySelectorAll("tr")).indexOf(row);
        const taskId = allTasks[rowIndex].id;

        try {
            await axios.delete(`http://localhost:3000/tasks/${taskId}`);
            row.remove();
        } catch (error) {
            console.log(error);
        }
    }
});


const addBtn = document.querySelector("#addBtn");
const inputNote = document.querySelector("#inputNote");
const inputDate = document.querySelector("#datePicker");

addBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const inputValue = inputNote.value.trim();
    if (!inputValue) return;

    const dateValue = inputDate.value;
    if (!dateValue) return;
    const newTask = {
        note: inputValue,
        status: "Pendiente",
        exp_Date: dateValue
    };
    try {
        const response = await axios.post("http://localhost:3000/tasks", newTask);
        console.log(response.data);
    }
    catch (error) {
        console.log(error);
    }
});

const editInput = document.querySelector("#editInput");
const saveEditBtn = document.querySelector("#saveEditBtn");
const editDate = document.querySelector("#editDate");

let currentTaskId = null;
let currentRow = null;
let currentRowIndex = null;

dataTable.addEventListener("click", (event) => {

    if (event.target.id === "editBtn") {


        const row = event.target.closest("tr");
        const rowIndex = Array.from(dataTable.querySelectorAll("tr")).indexOf(row);

        const task = allTasks[rowIndex];


        currentTaskId = task.id;
        currentRow = row;
        currentRowIndex = rowIndex;


        editInput.value = task.note;
        editDate.value = task.exp_Date;

        $("#editModal").modal("show");
    }
});

saveEditBtn.addEventListener("click", async () => {

    const newNote = editInput.value.trim();
    const newDate = editDate.value;


    if (!newNote || !newDate) return;

    const task = allTasks[currentRowIndex];

    const updatedTask = {
        ...task,
        note: newNote,
        exp_Date: newDate
    };

    try {

        await axios.put(
            `http://localhost:3000/tasks/${currentTaskId}`,
            updatedTask
        );

        currentRow.children[1].textContent = newNote;
        currentRow.children[3].textContent = newDate;



        allTasks[currentRowIndex].note = newNote;

        $("#editModal").modal("hide");

    } catch (error) {
        console.log(error);
    }
});


getUsers();