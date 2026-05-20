import axios from 'https://cdn.jsdelivr.net/npm/axios@1.11.0/+esm';


const getTasks = async () => {

    try {

        const response = await axios.get('http://localhost:3000/tasks');

        console.log(response.data);

    } catch (error) {

        console.error(error);

    }

};

getTasks();


const dropdownItems = document.querySelectorAll(".dropdown-item");

dropdownItems.forEach(item => {

    item.addEventListener("click", (event) => {
        event.preventDefault();

        const selectedText = event.target.textContent.trim();

        const dropdown = event.target.closest(".dropdown");

        const button = dropdown.querySelector(".statusBtn");

        button.textContent = selectedText;

        button.classList.remove("btn-secondary",
            "btn-danger",
            "btn-success");

        if (selectedText === "Pendiente") {
            button.classList.add("btn-secondary");
        }

        else if (selectedText === "En progreso") {
            button.classList.add("btn-danger");
        }

        else if (selectedText === "Completado") {
            button.classList.add("btn-success");
        }


    })
})

