const dataTable = document.querySelector(".listData")


async function getUsers() {
    try {
        const response = await axios.get("http://localhost:3000/tasks");



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


getUsers();