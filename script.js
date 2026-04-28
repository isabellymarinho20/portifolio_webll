// URL base do nosso servidor Node.js
const API_URL = "http://localhost:3000/api";

// --- FUNÇÕES DE CARREGAMENTO (GET) ---

async function carregarSecao(categoria, seletorGrid, templateFn) {
    const grid = document.querySelector(seletorGrid);
    if (!grid) return;

    try {
        const response = await fetch(`${API_URL}/${categoria}`);
        const itens = await response.json();
        
        grid.innerHTML = itens.map(item => templateFn(item, categoria)).join('');
    } catch (error) {
        console.error(`Erro ao carregar ${categoria}:`, error);
    }
}

// --- TEMPLATES DE RENDERIZAÇÃO ---

const tProjeto = (p, cat) => `
    <div class="project-card">
        <div class="project-image"><img src="${p.img}" alt="${p.titulo}"></div>
        <div class="project-info">
            <span class="tech-tag">${p.tech}</span>
            <h3>${p.titulo}</h3>
            <p>${p.desc}</p>
            <div class="admin-btns">
                <a href="${p.link}" target="_blank" class="btn-view">Ver</a>
                <button onclick="deletarItem('${cat}', ${p.id})" class="btn-delete">Excluir</button>
            </div>
        </div>
    </div>`;

const tCertificado = (c, cat) => `
    <div class="cert_card">
        <div class="cert_badge">${c.categoria}</div>
        <div class="cert_info">
            <h3>${c.titulo}</h3>
            <p class="instituicao">${c.instituicao}</p>
            <button onclick="deletarItem('${cat}', ${c.id})" class="btn-delete-small">Remover</button>
        </div>
    </div>`;

const tFormacao = (f, cat) => `
    <div class="timeline-card">
        <div class="card-content">
            <span class="ano">${f.ano}</span>
            <h3 class="curso">${f.curso}</h3>
            <p class="instituicao">${f.instituicao}</p>
            <button onclick="deletarItem('${cat}', ${f.id})" class="btn-delete-small">Excluir</button>
        </div>
    </div>`;

const tExperiencia = (e, cat) => `
    <div class="exp-card">
        <div class="exp-header"><h3>${e.empresa}</h3><span>${e.periodo}</span></div>
        <h4>${e.cargo}</h4>
        <p>${e.desc}</p>
        <button onclick="deletarItem('${cat}', ${e.id})" class="btn-delete">Excluir</button>
    </div>`;

// --- FUNÇÃO PARA DELETAR (DELETE) ---

async function deletarItem(categoria, id) {
    if (!confirm("Deseja realmente excluir este item?")) return;

    try {
        const response = await fetch(`${API_URL}/${categoria}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            location.reload(); // Recarrega para atualizar a interface
        }
    } catch (error) {
        alert("Erro ao excluir item do servidor.");
    }
}

// --- FUNÇÃO PARA ADICIONAR (POST) ---

async function processarFormulario(event, categoria, campos) {
    event.preventDefault();

    // Transforma os campos do formulário em um objeto JSON
    const payload = {};
    campos.forEach(campo => {
        payload[campo.chave] = document.getElementById(campo.idInput).value;
    });

    try {
        const response = await fetch(`${API_URL}/${categoria}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "index.html"; // Volta para a home
        }
    } catch (error) {
        alert("Erro ao enviar dados para o servidor Node.");
    }
}

// --- INICIALIZAÇÃO E EVENT LISTENERS ---

window.onload = () => {
    // Carrega os dados na página inicial
    carregarSecao("projetos", ".projects-grid", tProjeto);
    carregarSecao("certificados", ".cert_grid", tCertificado);
    carregarSecao("formacoes", ".timeline", tFormacao);
    carregarSecao("experiencias", ".exp-container", tExperiencia);

    // Configura os formulários de cadastro
    const formProjetos = document.getElementById("formProjeto");
    if (formProjetos) {
        formProjetos.onsubmit = (e) => processarFormulario(e, "projetos", [
            { idInput: "tituloProjeto", chave: "titulo" },
            { idInput: "techProjeto", chave: "tech" },
            { idInput: "descProjeto", chave: "desc" },
            { idInput: "linkProjeto", chave: "link" },
            { idInput: "imgProjeto", chave: "img" }
        ]);
    }

    const formCertificados = document.getElementById("formCertificado");
    if (formCertificados) {
        formCertificados.onsubmit = (e) => processarFormulario(e, "certificados", [
            { idInput: "tituloCert", chave: "titulo" },
            { idInput: "instCert", chave: "instituicao" },
            { idInput: "categoriaCert", chave: "categoria" }
        ]);
    }

    const formFormacao = document.getElementById("formFormacao");
    if (formFormacao) {
        formFormacao.onsubmit = (e) => processarFormulario(e, "formacoes", [
            { idInput: "anoFormacao", chave: "ano" },
            { idInput: "cursoFormacao", chave: "curso" },
            { idInput: "instFormacao", chave: "instituicao" }
        ]);
    }

    const formExperiencia = document.getElementById("formExperiencia");
    if (formExperiencia) {
        formExperiencia.onsubmit = (e) => processarFormulario(e, "experiencias", [
            { idInput: "empresaExp", chave: "empresa" },
            { idInput: "periodoExp", chave: "periodo" },
            { idInput: "cargoExp", chave: "cargo" },
            { idInput: "descExp", chave: "desc" }
        ]);
    }
};