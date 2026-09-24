// ===============================
// ELEMENTOS DA PÁGINA
// ===============================

const button = document.getElementById("newProject");
const form = document.getElementById("projectForm");
const saveButton = document.getElementById("saveProject");

const projectList = document.getElementById("projectList");
const projectCount = document.getElementById("projectCount");

const projectName = document.getElementById("projectName");
const projectTech = document.getElementById("projectTech");
const projectDescription = document.getElementById("projectDescription");

const themeToggle = document.getElementById("themeToggle");
const searchProject = document.getElementById("searchProject");


// ===============================
// PROJETOS
// ===============================

let projects = JSON.parse(localStorage.getItem("projects")) || [];

let editingIndex = null;
// Atualiza o link do FinTrack existente
projects.forEach(function (project) {
    if (
        project.name === "FinTrack API" &&
        !project.link
    ) {
        project.link =
            "https://github.com/anajmoreirasz-dot/-fintrack-api";
    }
});

localStorage.setItem(
    "projects",
    JSON.stringify(projects)
);


// ===============================
// PROJETO INICIAL
// ===============================

if (projects.length === 0) {

    projects.push({
        name: "FinTrack API",
        tech: "Python • FastAPI",
        description: "API desenvolvida para controle financeiro.",
        link: "https://github.com/anajmoreirasz-dot/-fintrack-api"
    });

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );
}


// ===============================
// MOSTRAR PROJETOS
// ===============================

function displayProjects() {

    projectList.innerHTML = "";

    projectCount.textContent = projects.length;


    if (projects.length === 0) {

        projectList.innerHTML = `
            <div class="project-card">

                <h3>📂 Nenhum projeto cadastrado</h3>

                <p>
                    Adicione seu primeiro projeto usando
                    o botão acima.
                </p>

            </div>
        `;

        return;
    }


    projects.forEach(function (project, index) {

       projectList.innerHTML += `
    <div class="project-card">

        <h3>💻 ${project.name}</h3>

        <p>${project.tech}</p>

        <p>${project.description}</p>

        <button
            class="editButton"
            data-index="${index}"
        >
            ✏️ Editar
        </button>

        <button
            class="deleteButton"
            data-index="${index}"
        >
            🗑️ Excluir
        </button>

        ${
            project.link
                ? `
                    <a
                        href="${project.link}"
                        target="_blank"
                        class="githubButton"
                    >
                        🔗 Ver no GitHub
                    </a>
                `
                : ""
        }

    </div>
`;
    });


    // ===============================
    // EDITAR PROJETO
    // ===============================

    const editButtons =
        document.querySelectorAll(".editButton");


    editButtons.forEach(function (editButton) {

        editButton.addEventListener("click", function () {

            const index =
                Number(editButton.getAttribute("data-index"));

            const project = projects[index];


            projectName.value = project.name;

            projectTech.value = project.tech;

            projectDescription.value =
                project.description;


            editingIndex = index;

            form.style.display = "block";


            form.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    });


    // ===============================
    // EXCLUIR PROJETO
    // ===============================

    const deleteButtons =
        document.querySelectorAll(".deleteButton");


    deleteButtons.forEach(function (deleteButton) {

        deleteButton.addEventListener("click", function () {

            const index =
                Number(deleteButton.getAttribute("data-index"));


            const confirmDelete = confirm(
                "Tem certeza que deseja excluir este projeto?"
            );


            if (!confirmDelete) {
                return;
            }


            projects.splice(index, 1);


            localStorage.setItem(
                "projects",
                JSON.stringify(projects)
            );


            displayProjects();

        });

    });

}


// ===============================
// ABRIR FORMULÁRIO
// ===============================

button.addEventListener("click", function () {

    editingIndex = null;

    projectName.value = "";
    projectTech.value = "";
    projectDescription.value = "";

    form.style.display = "block";

    form.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// ===============================
// SALVAR PROJETO
// ===============================

saveButton.addEventListener("click", function () {

    const name =
        projectName.value.trim();

    const tech =
        projectTech.value.trim();

    const description =
        projectDescription.value.trim();


    if (
        name === "" ||
        tech === "" ||
        description === ""
    ) {

        alert("Preencha todos os campos! ⚠️");

        return;
    }


    // ===============================
    // EDITAR
    // ===============================

    if (editingIndex !== null) {

        projects[editingIndex] = {

            name: name,

            tech: tech,

            description: description

        };


        alert(
            "Projeto atualizado com sucesso! ✏️"
        );

    }


    // ===============================
    // NOVO PROJETO
    // ===============================

    else {

        projects.push({

            name: name,

            tech: tech,

            description: description

        });


        alert(
            "Projeto cadastrado com sucesso! 🚀"
        );

    }


    // ===============================
    // SALVAR
    // ===============================

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );


    displayProjects();


    projectName.value = "";
    projectTech.value = "";
    projectDescription.value = "";

    form.style.display = "none";

    editingIndex = null;

});


// ===============================
// 🌙 MODO CLARO / ESCURO
// ===============================

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");


    if (darkMode) {

        themeToggle.textContent = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeToggle.textContent = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});


// ===============================
// CARREGAR TEMA SALVO
// ===============================

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀️";

} else {

    document.body.classList.remove("dark");

    themeToggle.textContent = "🌙";

}


// ===============================
// PESQUISA
// ===============================

searchProject.addEventListener(
    "input",
    function () {

        const searchText =
            searchProject.value
                .toLowerCase()
                .trim();


        const projectCards =
            document.querySelectorAll(".project-card");


        projectCards.forEach(function (project) {

            const projectText =
                project.textContent.toLowerCase();


            if (
                projectText.includes(searchText)
            ) {

                project.style.display = "";

            } else {

                project.style.display = "none";

            }

        });

    }
);


// ===============================
// CARREGAR PROJETOS
// ===============================

displayProjects();