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


// ===============================
// PROJETO INICIAL
// ===============================

// Se ainda não existir nenhum projeto,
// adicionamos o FinTrack automaticamente.

if (projects.length === 0) {

    projects.push({
        name: "FinTrack API",
        tech: "Python • FastAPI",
        description: "API desenvolvida para controle financeiro."
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

    // Atualiza o contador
    projectCount.textContent = projects.length;


    // Caso não tenha projetos
    if (projects.length === 0) {

        projectList.innerHTML = `
            <div class="project">
                <h3>📂 Nenhum projeto cadastrado</h3>

                <p>
                    Adicione seu primeiro projeto usando
                    o botão acima.
                </p>
            </div>
        `;

        return;
    }


    // Mostrar todos os projetos
    projects.forEach(function (project, index) {

        projectList.innerHTML += `
            <div class="project">

                <h3>${project.name}</h3>

                <p>${project.description}</p>

                <span>${project.tech}</span>

                <br><br>

                <button
                    class="editButton"
                    data-index="${index}"
                >
                    ✏️ Editar projeto
                </button>

                <button
                    class="deleteButton"
                    data-index="${index}"
                >
                    🗑️ Excluir projeto
                </button>

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


    // Verificar campos
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

        const newProject = {

            name: name,

            tech: tech,

            description: description

        };


        projects.push(newProject);


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


    // Atualizar tela
    displayProjects();


    // Limpar formulário
    projectName.value = "";

    projectTech.value = "";

    projectDescription.value = "";


    // Fechar formulário
    form.style.display = "none";


    editingIndex = null;

});


// ===============================
// MODO CLARO / ESCURO
// ===============================

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle(
        "light-mode"
    );


    if (
        document.body.classList.contains(
            "light-mode"
        )
    ) {

        themeToggle.textContent = "☀️";

    } else {

        themeToggle.textContent = "🌙";

    }

});


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
            document.querySelectorAll(".project");


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