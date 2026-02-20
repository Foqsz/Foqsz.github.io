const usuario = "Foqsz"; // coloque seu github aqui

let pagina = 1;
const porPagina = 4;

async function carregarRepos() {

    try {

        const response = await fetch(
            `https://api.github.com/users/${usuario}/repos?per_page=${porPagina}&page=${pagina}&sort=updated`
        );

        const repos = await response.json();

        const container = document.getElementById("projectsList");
        container.innerHTML = "";

        repos
            .filter(repo => !repo.fork && !repo.private)
            .forEach(repo => {

                const card = document.createElement("article");
                card.className = "projects__card";

                card.innerHTML = `
                    <img src="./images/Tecnologias/github-code.png"
                        class="projects__card__img"
                        alt="GitHub">

                    <div class="projects__card__content">
                        <h3 class="h3">
                            ${repo.name}
                            <span class="title--thin">
                                ${repo.language ?? "Projeto"}
                            </span>
                        </h3>

                        <p>${repo.description ?? "Sem descrição."}</p>

                        <div class="projects__card__ctas">

                            ${
                                repo.has_pages
                                ? `<a href="${repo.homepage || `https://${usuario}.github.io/${repo.name}`}"
                                    target="_blank"
                                    class="btn btn--ghost">
                                    Ver Projeto
                                </a>`
                                : `<button class="btn btn--ghost btn--nodeploy" disabled>
                                    Sem Deploy
                                </button>`
                            }

                            <a href="${repo.html_url}" target="_blank"
                            class="btn btn--stroke">
                            Código
                            </a>

                        </div>
                    </div>
                `;

                container.appendChild(card);
            });

    } catch (erro) {
        console.error("Erro ao carregar projetos:", erro);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    carregarRepos();

    const buttonEnd = document.getElementById("endPage");
    const buttonNext = document.getElementById("nextPage");

    buttonEnd.addEventListener("click", paginaAnterior);
    buttonNext.addEventListener("click", proximaPagina);
});

function proximaPagina() {
    pagina++;
    carregarRepos();

    window.scrollTo({
        top: document.getElementById("projetos").offsetTop,
        behavior: "smooth"
    });
}

function paginaAnterior() {
    if (pagina > 1) {
        pagina--;
        carregarRepos();
    }

    window.scrollTo({
        top: document.getElementById("projetos").offsetTop,
        behavior: "smooth"
    });
}

// carrega ao abrir página
document.addEventListener("DOMContentLoaded", carregarRepos);