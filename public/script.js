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

async function listarProjetosAdmin(){
    const grid = document.querySelector('.projects-grid');
    if(!grid) return;

    const res = await fetch('/api/projetos');
    const projetos = await res.json();

    grid.innerHTML = projetos.map((p, i) => `
        <div class="admin-card">
            <div>
                <strong>${p.titulo}</strong>
                <p>${p.tech}</p>
            </div>
            <div>
                <button onclick="editarProjeto(${i})">✏️</button>
                <button onclick="deletarProjeto(${i})">🗑️</button>
            </div>
        </div>
    `).join("");
}

function editarProjeto(id){
    localStorage.setItem("editProjeto", id);
    window.location.href = "novoprojeto.html";
}

async function deletarProjeto(id){
    await fetch(`/api/projetos/${id}`, { method: 'DELETE' });
    listarProjetosAdmin();
}

async function adicionarProjeto(e){
    e.preventDefault();

    const novo = {
        titulo: tituloProjeto.value,
        tech: techProjeto.value,
        desc: descProjeto.value,
        link: linkProjeto.value,
        img: imgProjeto.value
    };

    await fetch('/api/projetos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(novo)
    });

    window.location.href = "index.html";
}

async function carregarEdicaoProjeto(){
    const id = localStorage.getItem("editProjeto");
    if(id === null) return;

    const res = await fetch('/api/projetos');
    const projetos = await res.json();
    const p = projetos[id];

    tituloProjeto.value = p.titulo;
    techProjeto.value = p.tech;
    descProjeto.value = p.desc;
    linkProjeto.value = p.link;
    imgProjeto.value = p.img;
}

async function salvarEdicaoProjeto(){
    const id = localStorage.getItem("editProjeto");
    if(id === null) return;

    const atualizado = {
        titulo: tituloProjeto.value,
        tech: techProjeto.value,
        desc: descProjeto.value,
        link: linkProjeto.value,
        img: imgProjeto.value
    };

    await fetch(`/api/projetos/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(atualizado)
    });

    localStorage.removeItem("editProjeto");
    window.location.href = "index.html";
}

async function listarCertificadosAdmin(){
    const grid = document.querySelector('.cert_grid');
    if(!grid) return;

    const res = await fetch('/api/certificados');
    const data = await res.json();

    grid.innerHTML = data.map((c,i) => `
        <div class="admin-card">
            <div>
                <strong>${c.titulo}</strong>
                <p>${c.instituicao}</p>
            </div>
            <div>
                <button onclick="editarCert(${i})">✏️</button>
                <button onclick="deletarCert(${i})">🗑️</button>
            </div>
        </div>
    `).join("");
}

function editarCert(id){
    localStorage.setItem("editCert", id);
    window.location.href = "novocertificado.html";
}

async function deletarCert(id){
    await fetch(`/api/certificados/${id}`, { method: 'DELETE' });
    listarCertificadosAdmin();
}

async function adicionarCertificado(e){
    e.preventDefault();

    const novo = {
        titulo: tituloCert.value,
        instituicao: instCert.value,
        categoria: categoriaCert.value
    };

    await fetch('/api/certificados', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(novo)
    });

    window.location.href = "index.html";
}

async function carregarEdicaoCert(){
    const id = localStorage.getItem("editCert");
    if(id === null) return;

    const res = await fetch('/api/certificados');
    const data = await res.json();
    const c = data[id];

    tituloCert.value = c.titulo;
    instCert.value = c.instituicao;
    categoriaCert.value = c.categoria;
}

async function salvarEdicaoCert(){
    const id = localStorage.getItem("editCert");
    if(id === null) return;

    const atualizado = {
        titulo: tituloCert.value,
        instituicao: instCert.value,
        categoria: categoriaCert.value
    };

    await fetch(`/api/certificados/${id}`, {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(atualizado)
    });

    localStorage.removeItem("editCert");
    window.location.href = "index.html";
}


async function listarFormacoesAdmin(){
    const container = document.querySelector('.formacoes-lista');
    if(!container) return;

    const res = await fetch('/api/formacoes');
    const data = await res.json();

    container.innerHTML = data.map((f,i)=>`
        <div class="admin-card">
            <div>
                <strong>${f.curso}</strong>
                <p>${f.instituicao}</p>
                <span>${f.ano}</span>
            </div>
            <div>
                <button onclick="editarFormacao(${i})">✏️</button>
                <button onclick="deletarFormacao(${i})">🗑️</button>
            </div>
        </div>
    `).join("");
}

function editarFormacao(id){
    localStorage.setItem("editFormacao", id);
    window.location.href = "novaformacao.html";
}

async function deletarFormacao(id){
    await fetch(`/api/formacoes/${id}`, { method:'DELETE' });
    listarFormacoesAdmin();
}

async function adicionarFormacao(e){
    e.preventDefault();

    const nova = {
        ano: anoFormacao.value,
        curso: cursoFormacao.value,
        instituicao: instFormacao.value
    };

    await fetch('/api/formacoes',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(nova)
    });

    window.location.href = "index.html";
}

async function carregarEdicaoFormacao(){
    const id = localStorage.getItem("editFormacao");
    if(id === null) return;

    const res = await fetch('/api/formacoes');
    const data = await res.json();
    const f = data[id];

    anoFormacao.value = f.ano;
    cursoFormacao.value = f.curso;
    instFormacao.value = f.instituicao;
}

async function salvarEdicaoFormacao(){
    const id = localStorage.getItem("editFormacao");
    if(id === null) return;

    const atualizado = {
        ano: anoFormacao.value,
        curso: cursoFormacao.value,
        instituicao: instFormacao.value
    };

    await fetch(`/api/formacoes/${id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(atualizado)
    });

    localStorage.removeItem("editFormacao");
    window.location.href = "index.html";
}


async function listarExperienciasAdmin(){
    const container = document.querySelector('.exp-lista');
    if(!container) return;

    const res = await fetch('/api/experiencias');
    const data = await res.json();

    container.innerHTML = data.map((e,i)=>`
        <div class="admin-card">
            <div>
                <strong>${e.empresa}</strong>
                <p>${e.cargo}</p>
                <span>${e.periodo}</span>
            </div>
            <div>
                <button onclick="editarExp(${i})">✏️</button>
                <button onclick="deletarExp(${i})">🗑️</button>
            </div>
        </div>
    `).join("");
}

function editarExp(id){
    localStorage.setItem("editExp", id);
    window.location.href = "novaexperiencia.html";
}

async function deletarExp(id){
    await fetch(`/api/experiencias/${id}`, { method:'DELETE' });
    listarExperienciasAdmin();
}

async function adicionarExperiencia(e){
    e.preventDefault();

    const nova = {
        empresa: empresaExp.value,
        periodo: periodoExp.value,
        cargo: cargoExp.value,
        desc: descExp.value
    };

    await fetch('/api/experiencias',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(nova)
    });

    window.location.href = "index.html";
}

async function carregarEdicaoExp(){
    const id = localStorage.getItem("editExp");
    if(id === null) return;

    const res = await fetch('/api/experiencias');
    const data = await res.json();
    const e = data[id];

    empresaExp.value = e.empresa;
    periodoExp.value = e.periodo;
    cargoExp.value = e.cargo;
    descExp.value = e.desc;
}

async function salvarEdicaoExp(){
    const id = localStorage.getItem("editExp");
    if(id === null) return;

    const atualizado = {
        empresa: empresaExp.value,
        periodo: periodoExp.value,
        cargo: cargoExp.value,
        desc: descExp.value
    };

    await fetch(`/api/experiencias/${id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(atualizado)
    });

    localStorage.removeItem("editExp");
    window.location.href = "index.html";
}

window.onload = function(){

    
    carregarProjetos();
    carregarCertificados();
    carregarFormacao();
    carregarExperiencia();
    carregarJanelaCodigo();

    
    if(formProjeto){
        formProjeto.addEventListener("submit", adicionarProjeto);
        listarProjetosAdmin();
        carregarEdicaoProjeto();
    }

    
    if(formCertificado){
        formCertificado.addEventListener("submit", adicionarCertificado);
        listarCertificadosAdmin();
        carregarEdicaoCert();
    }

    
    if(formFormacao){
        formFormacao.addEventListener("submit", adicionarFormacao);
        listarFormacoesAdmin();
        carregarEdicaoFormacao();
    }

    
    if(formExperiencia){
        formExperiencia.addEventListener("submit", adicionarExperiencia);
        listarExperienciasAdmin();
        carregarEdicaoExp();
    }
};