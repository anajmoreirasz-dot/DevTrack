const button = document.getElementById("newProject");
const form = document.getElementById("projectForm");
const saveButton = document.getElementById("saveProject");
const projectList = document.getElementById("projectList");

let projects = JSON.parse(localStorage.getItem("projects")) || [];

let editingIndex = null;


// ===============================
// MOSTRAR PROJETOS
// ===============================

function displayProjects() {

    projectList.innerHTML = "";

    document.getElementById("projectCount").textContent = projects.length;

    projects.forEach(function (project, index) {

        projectList.innerHTML += `
            <div class="project">

                <h3>${project.name}</h3>

                <p>${project.description}</p>

                <span>${project.tech}</span>

                <br><br>

                <button class="editButton" data-index="${index}">
                    Editar projeto
                </button>

                <button class="deleteButton" data-index="${index}">
                    Excluir projeto
                </button>

            </div>
        `;
    });


    // ===============================
    // BOTÃO EDITAR
    // ===============================

    const editButtons = document.querySelectorAll(".editButton");

    editButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index = Number(button.getAttribute("data-index"));

            const project = projects[index];

            document.getElementById("projectName").value = project.name;

            document.getElementById("projectTech").value = project.tech;

            document.getElementById("projectDescription").value = project.description;

            editingIndex = index;

            form.style.display = "block";

        });

    });


    // ===============================
    // BOTÃO EXCLUIR
    // ===============================

    const deleteButtons = document.querySelectorAll(".deleteButton");

    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index = Number(button.getAttribute("data-index"));

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

    form.style.display = "block";

});


// ===============================
// SALVAR PROJETO
// ===============================

saveButton.addEventListener("click", function () {

    const name =
        document.getElementById("projectName").value.trim();

    const tech =
        document.getElementById("projectTech").value.trim();

    const description =
        document.getElementById("projectDescription").value.trim();


    // Verificar campos

    if (
        name === "" ||
        tech === "" ||
        description === ""
    ) {

        alert("Preencha todos os campos!");

        return;

    }


    // ===============================
    // EDITAR PROJETO EXISTENTE
    // ===============================

    if (editingIndex !== null) {

        projects[editingIndex] = {

            name: name,

            tech: tech,

            description: description

        };

        alert("Projeto atualizado com sucesso! ✏️");

    }


    // ===============================
    // CRIAR NOVO PROJETO
    // ===============================

    else {

        const newProject = {

            name: name,

            tech: tech,

            description: description

        };

        projects.push(newProject);

        alert("Projeto cadastrado com sucesso! 🚀");

    }


    // Salvar no navegador

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );


    // Atualizar lista

    displayProjects();


    // Limpar formulário

    document.getElementById("projectName").value = "";

    document.getElementById("projectTech").value = "";

    document.getElementById("projectDescription").value = "";


    // Fechar formulário

    form.style.display = "none";


    // Voltar para modo novo projeto

    editingIndex = null;

});


// ===============================
// CARREGAR PROJETOS AO ABRIR
// ===============================

displayProjects();