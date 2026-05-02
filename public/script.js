const configuracaoPython = {
    codigo: `from flask import Flask, redirect, url_for
        
@app.route('/')
function home():
    return redirect(url_for('auth.portfolio'))
        
if __name__ == '__main__':
    app.run(debug=True)`
};

function carregarJanelaCodigo() {
    const container = document.getElementById('container-python');
    if(!container) return;

    container.innerHTML = `
        <div class="code-window">
            <div class="code-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
            </div>
            <div class="code-content">
                <pre><code>${configuracaoPython.codigo}</code></pre>
            </div>
        </div>
    `;
}

// --- PROJETOS ---

async function listarProjetos() {
    const grid = document.querySelector('.projects-grid');
    if(!grid) return;

    try {
        const res = await fetch('/api/projetos');
        const projetos = await res.json();

        
        const isAdmin = !!document.getElementById('formProjeto');

        grid.innerHTML = projetos.map((p, i) => `
            <div class="project-card">
                <div class="project-image">
                    <img src="${p.img}" alt="${p.titulo}">
                </div>
                <div class="project-info">
                    <h3 class="project-card-title">${p.titulo}</h3>
                    <p class="project-tech">${p.tech}</p>
                    <p class="project-description">${p.desc}</p>
                    
                    ${isAdmin ? `
                        <div class="admin-actions">
                            <button class="btn-outline" onclick="editarProjeto(${i})">Editar</button>
                            <button class="btn-outline btn-delete" onclick="deletarProjeto(${i})">Excluir</button>
                        </div>
                    ` : `
                        <a href="${p.link}" target="_blank" class="btn-view-project">Ver Projeto</a>
                    `}
                </div>
            </div>
        `).join("");
    } catch (err) {
        console.error("Erro ao carregar projetos:", err);
    }
}

async function adicionarProjeto(e) {
    e.preventDefault();
    const novo = {
        titulo: document.getElementById('tituloProjeto').value,
        tech: document.getElementById('techProjeto').value,
        desc: document.getElementById('descProjeto').value,
        link: document.getElementById('linkProjeto').value,
        img: document.getElementById('imgProjeto').value
    };

    const response = await fetch('/api/projetos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novo)
    });

    if (response.ok) {
        alert("Projeto adicionado!");
        window.location.href = "index.html";
    }
}

async function salvarEdicao() {
    const id = localStorage.getItem("editProjeto");
    const atualizado = {
        titulo: document.getElementById('tituloProjeto').value,
        tech: document.getElementById('techProjeto').value,
        desc: document.getElementById('descProjeto').value,
        link: document.getElementById('linkProjeto').value,
        img: document.getElementById('imgProjeto').value
    };

    const response = await fetch(`/api/projetos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atualizado)
    });

    if (response.ok) {
        localStorage.removeItem("editProjeto");
        alert("Projeto atualizado!");
        window.location.href = "index.html";
    }
}

async function preencherCamposEdicao(id) {
    const res = await fetch('/api/projetos'); 
    const projetos = await res.json();
    const p = projetos[id];

    if (p) {
        document.getElementById('tituloProjeto').value = p.titulo;
        document.getElementById('techProjeto').value = p.tech;
        document.getElementById('descProjeto').value = p.desc;
        document.getElementById('linkProjeto').value = p.link;
        document.getElementById('imgProjeto').value = p.img;
        document.querySelector('.admin-btn').innerText = "Confirmar Alterações";
    }
}

function editarProjeto(id) { localStorage.setItem("editProjeto", id); window.location.href = "novoprojeto.html"; }
async function deletarProjeto(id) {
    
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
        try {
            const response = await fetch(`/api/projetos/${id}`, { 
                method: 'DELETE' 
            });

            if (response.ok) {
                listarProjetos(); 
            } else {
                alert("Erro ao excluir o projeto.");
            }
        } catch (err) {
            console.error("Erro na requisição de exclusão:", err);
        }
    }
}

// --- CERTIFICADOS ---

async function listarCertificados() {
    const grid = document.querySelector('.cert_grid');
    if(!grid) return;

    try {
        const res = await fetch('/api/certificados');
        const data = await res.json();
        
        
        const isFormPage = !!document.getElementById('formCertificado');

        grid.innerHTML = data.map((c, i) => `
            <div class="admin-card">
                <div class="info">
                    <strong>${c.titulo}</strong>
                    <p>${c.instituicao}</p>
                </div>
                ${isFormPage ? `
                <div class="actions">
                    <button class="btn-outline" onclick="editarCert(${i})">Editar</button>
                    <button class="btn-outline btn-delete" onclick="deletarCert(${i})">Excluir</button>
                </div>
                ` : ''}
            </div>
        `).join("");
    } catch (err) {
        console.error("Erro ao listar certificados:", err);
    }
}

async function adicionarCertificado(e) {
    e.preventDefault();
    const novo = {
        titulo: document.getElementById('tituloCert').value,
        instituicao: document.getElementById('instCert').value,
        categoria: document.getElementById('categoriaCert').value
    };
    await fetch('/api/certificados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novo)
    });
    window.location.href = "index.html";
}

async function salvarEdicaoCert() {
    const id = localStorage.getItem("editCert");
    const atualizado = {
        titulo: document.getElementById('tituloCert').value,
        instituicao: document.getElementById('instCert').value,
        categoria: document.getElementById('categoriaCert').value
    };
    await fetch(`/api/certificados/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atualizado)
    });
    localStorage.removeItem("editCert");
    window.location.href = "index.html";
}

async function preencherCamposEdicaoCert(id) {
    const res = await fetch('/api/certificados');
    const certificados = await res.json();
    const c = certificados[id];
    if (c) {
        document.getElementById('tituloCert').value = c.titulo;
        document.getElementById('instCert').value = c.instituicao;
        document.getElementById('categoriaCert').value = c.categoria;
    }
}

function editarCert(id) { localStorage.setItem("editCert", id); window.location.href = "novoCertificado.html"; }
async function deletarCert(id) {
    if(confirm("Deseja excluir este certificado?")) {
        await fetch(`/api/certificados/${id}`, { method: 'DELETE' });
        listarCertificados(); 
    }
}

// --- FORMAÇÕES ---

async function listarFormacoes() {
    
    const container = document.querySelector('.timeline') || document.querySelector('.formacoes-lista');
    if(!container) return;

    try {
        const res = await fetch('/api/formacoes');
        const data = await res.json();
        const isFormPage = !!document.getElementById('formFormacao');

        container.innerHTML = data.map((f, i) => `
            <div class="admin-card">
                <div class="info">
                    <strong>${f.curso}</strong>
                    <span>${f.ano}</span>
                    <p>${f.instituicao}</p>
                </div>
                ${isFormPage ? `
                <div class="actions">
                    <button class="btn-outline" onclick="editarFormacao(${i})">Editar</button>
                    <button class="btn-outline btn-delete" onclick="deletarFormacao(${i})">Excluir</button>
                </div>
                ` : ''}
            </div>
        `).join("");
    } catch (err) {
        console.error("Erro ao listar formações:", err);
    }
}

async function adicionarFormacao(e) {
    e.preventDefault();
    const nova = {
        ano: document.getElementById('anoFormacao').value,
        curso: document.getElementById('cursoFormacao').value,
        instituicao: document.getElementById('instFormacao').value
    };
    await fetch('/api/formacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nova)
    });
    window.location.href = "index.html";
}

async function salvarEdicaoFormacao() {
    const id = localStorage.getItem("editFormacao");
    const atualizada = {
        ano: document.getElementById('anoFormacao').value,
        curso: document.getElementById('cursoFormacao').value,
        instituicao: document.getElementById('instFormacao').value
    };
    await fetch(`/api/formacoes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atualizada)
    });
    localStorage.removeItem("editFormacao");
    window.location.href = "index.html";
}

async function preencherCamposEdicaoFormacao(id) {
    const res = await fetch('/api/formacoes');
    const data = await res.json();
    const f = data[id];
    if (f) {
        document.getElementById('anoFormacao').value = f.ano;
        document.getElementById('cursoFormacao').value = f.curso;
        document.getElementById('instFormacao').value = f.instituicao;
    }
}

function editarFormacao(id) { localStorage.setItem("editFormacao", id); window.location.href = "novaFormacao.html"; }
async function deletarFormacao(id) {
    if(confirm("Deseja excluir esta formação?")) {
        await fetch(`/api/formacoes/${id}`, { method: 'DELETE' });
        listarFormacoes(); 
    }
}

// --- EXPERIÊNCIAS ---

async function listarExperiencias() {
    
    const container = document.querySelector('.exp-lista') || document.querySelector('.exp-container');
    if(!container) return;

    try {
        const res = await fetch('/api/experiencias'); 
        const data = await res.json();
        
        
        const isFormPage = !!document.getElementById('formExperiencia');

        container.innerHTML = data.map((e, i) => `
            <div class="admin-card">
                <div class="info">
                    <strong>${e.empresa}</strong>
                    <p><strong>${e.cargo}</strong> | ${e.periodo}</p>
                </div>
                ${isFormPage ? `
                <div class="actions">
                    <button class="btn-outline" onclick="editarExp(${i})">Editar</button>
                    <button class="btn-outline btn-delete" onclick="deletarExp(${i})">Excluir</button>
                </div>
                ` : ''}
            </div>
        `).join("");
    } catch (err) {
        console.error("Erro ao listar experiências:", err);
    }
}

async function adicionarExperiencia(e) {
    e.preventDefault();
    const nova = {
        empresa: document.getElementById('empresaExp').value,
        periodo: document.getElementById('periodoExp').value,
        cargo: document.getElementById('cargoExp').value,
        desc: document.getElementById('descExp').value
    };
    await fetch('/api/experiencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nova)
    });
    window.location.href = "index.html";
}

async function salvarEdicaoExperiencia() {
    const id = localStorage.getItem("editExp");
    const atualizada = {
        empresa: document.getElementById('empresaExp').value,
        periodo: document.getElementById('periodoExp').value,
        cargo: document.getElementById('cargoExp').value,
        desc: document.getElementById('descExp').value
    };
    await fetch(`/api/experiencias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atualizada)
    });
    localStorage.removeItem("editExp");
    window.location.href = "index.html";
}

async function preencherCamposEdicaoExp(id) {
    const res = await fetch('/api/experiencias');
    const data = await res.json();
    const e = data[id];
    if (e) {
        document.getElementById('empresaExp').value = e.empresa;
        document.getElementById('periodoExp').value = e.periodo;
        document.getElementById('cargoExp').value = e.cargo;
        document.getElementById('descExp').value = e.desc;
    }
}

function editarExp(id) { localStorage.setItem("editExp", id); window.location.href = "novaexperiencia.html"; }
async function deletarExp(id) {
    if(confirm("Tem certeza que deseja excluir esta experiência?")) {
        await fetch(`/api/experiencias/${id}`, { method: 'DELETE' }); //
        listarExperiencias(); 
    }
}



window.onload = function() {
    carregarJanelaCodigo();

    
    if (document.querySelector('.sobreMim_section')) {
        listarProjetos();
        listarCertificados();
        listarFormacoes();
        listarExperiencias();
    }

    
    const fProj = document.getElementById('formProjeto');
    if (fProj) {
        fProj.addEventListener("submit", adicionarProjeto);
        listarProjetos();
        const id = localStorage.getItem("editProjeto");
        if (id !== null) preencherCamposEdicao(id);
    }

   
    const fCert = document.getElementById('formCertificado');
    if (fCert) {
        fCert.addEventListener("submit", adicionarCertificado);
        listarCertificados();
        const id = localStorage.getItem("editCert");
        if (id !== null) preencherCamposEdicaoCert(id);
    }

    
    const fForm = document.getElementById('formFormacao');
    if (fForm) {
        fForm.addEventListener("submit", adicionarFormacao);
        listarFormacoes();
        const id = localStorage.getItem("editFormacao");
        if (id !== null) preencherCamposEdicaoFormacao(id);
    }

    const fExp = document.getElementById('formExperiencia');
    if (fExp) {
        fExp.addEventListener("submit", adicionarExperiencia);
        listarExperiencias(); 
        const id = localStorage.getItem("editExp");
        if (id !== null) preencherCamposEdicaoExp(id);
    }
}