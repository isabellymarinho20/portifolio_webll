// Objeto com os dados da janela de código
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
    
    const html = `
        <div class="code-window">
            <div class="code-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
            </div>
            <div class="code-content">
                <pre><code id="python-code">${configuracaoPython.codigo}</code></pre>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}



// CERTIFICADOS
const Certificados = [
    { titulo: "Inglês Nível B1", instituicao: "TOEFL", categoria: "Internacional" },
    { titulo: "Desafio de Ideias ON", instituicao: "SENAI", categoria: "Tecnologia" },
    { titulo: "Python Essentials 1", instituicao: "Cisco", categoria: "Especialização" },
    { titulo: "Fundamentos FlutterFlow", instituicao: "NoCode", categoria: "Especialização" },
    { titulo: "Escola de Inovadores", instituicao: "INOVA CPS", categoria: "Especialização" },
    { titulo: "Introdução ao SCRUM", instituicao: "FGV", categoria: "Especialização" }
];

function carregarCertificados() {

    const grid = document.querySelector('.cert_grid');
    if(!grid) return;

    let salvos = JSON.parse(localStorage.getItem("certificados")) || [];

    const todos = Certificados.concat(salvos);

    let html = "";

    for (let cert of todos) {

        html += `
        <div class="cert_card">
            <div class="cert_badge">${cert.categoria}</div>
            <div class="cert_info">
                <h3>${cert.titulo}</h3>
                <p class="instituicao">${cert.instituicao}</p>
            </div>
        </div>`;
    }

    grid.innerHTML = html;
}



// FORMAÇÕES
const Formacoes = [
    { ano: "2025 — Cursando", curso: "Desenvolvimento de Software Multiplataforma", instituicao: "FATEC SJC" },
    { ano: "2024 — Cursando", curso: "Técnico em Desenvolvimento de Sistemas", instituicao: "SENAI SJC" },
    { ano: "2022 — 2024", curso: "Ensino Médio Técnico em Informática", instituicao: "UNIVAP" }
];

function carregarFormacao() {

    const timeline = document.querySelector('.timeline');
    if(!timeline) return;

    let salvos = JSON.parse(localStorage.getItem("formacoes")) || [];

    const todos = Formacoes.concat(salvos);

    let html = "";

    for (let f of todos) {

        html += `
        <div class="timeline-card">
            <div class="card-content">
                <span class="ano">${f.ano}</span>
                <h3 class="curso">${f.curso}</h3>
                <p class="instituicao">${f.instituicao}</p>
            </div>
        </div>`;
    }

    timeline.innerHTML = html;
}



// PROJETOS
const Projetos = [
{ titulo: "Análise de Falhas", tech: "Python | Flask", desc: "Software para análise técnica de equipamentos.", link: "https://github.com/isabellymarinho20/Structured-process-for-failure-analysis.git", img: "img/petro.jpg" },
{ titulo: "Análise de Documentação", tech: "N8N | Gemini", desc: "Treinamento de IA via API.", link: "https://github.com/isabellymarinho20/analise_documentacao.git", img: "img/documen.jpg" },
{ titulo: "Censo IBGE SJC", tech: "HTML | CSS | Python", desc: "Visualização de dados para transparência.", link: "https://github.com/FATCK06/ProjectAPI_FirstSemester.git", img: "img/sjc.png" },
{ titulo: "Controle do almoxarifado de eletrônica ", tech: "HTML | CSS | JAVASCRIPT", desc: "Aplicação web para controlar o almoxarifado de eletronica.", link: "https://github.com/isabellymarinho20/Eletronics-Warehouse-Inventory-System-.git", img: "img/ele.jpg" },
{ titulo: "API para FastFood", tech: "JAVA", desc: "API em java para pedidos.", link: "https://github.com/isabellymarinho20/garagem.git", img: "img/fas.png" },
{ titulo: "IA para identificação de fogo e fumaça", tech: "Python | YOLO", desc: "IA para identificar fogo e fumaça.", link: "#", img: "img/fogo.jpg" }
];

function carregarProjetos(){

    const grid = document.querySelector('.projects-grid');
    if(!grid) return;

    let salvos = JSON.parse(localStorage.getItem("projetos")) || [];

    const todos = Projetos.concat(salvos);

    let html = "";

    for(let p of todos){

        html += `
        <div class="project-card">

            <div class="project-image">
                <img src="${p.img}">
            </div>

            <div class="project-info">
                <span class="tech-tag">${p.tech}</span>
                <h3>${p.titulo}</h3>
                <p>${p.desc}</p>
                <a href="${p.link}" class="btn-view">Ver Projeto</a>
            </div>

        </div>`;
    }

    grid.innerHTML = html;
}



// EXPERIENCIAS
const Experiencias = [
{ empresa: "Petrobras", periodo: "2024 — Atualmente", cargo: "Jovem Aprendiz", desc: "Curso de desenvolvimento de sistemas" },
{ empresa: "SanjaWorks", periodo: "2024 — 2025", cargo: "Estágio Técnico de Informática", desc: "Automações com N8N e IA" }
];

function carregarExperiencia(){

    const container = document.querySelector('.exp-container');
    if(!container) return;

    let salvos = JSON.parse(localStorage.getItem("experiencias")) || [];

    const todos = Experiencias.concat(salvos);

    let html = "";

    for(let e of todos){

        html += `
        <div class="exp-card">

            <div class="exp-header">
                <h3 class="exp-company">${e.empresa}</h3>
                <span class="exp-date">${e.periodo}</span>
            </div>

            <h4 class="exp-role">${e.cargo}</h4>

            <p>${e.desc}</p>

        </div>`;
    }

    container.innerHTML = html;
}



// FORMULÁRIOS ADMIN

function adicionarProjeto(event){

    event.preventDefault();

    const novo = {

        titulo: document.getElementById("tituloProjeto").value,
        tech: document.getElementById("techProjeto").value,
        desc: document.getElementById("descProjeto").value,
        link: document.getElementById("linkProjeto").value,
        img: document.getElementById("imgProjeto").value

    };

    let salvos = JSON.parse(localStorage.getItem("projetos")) || [];

    salvos.push(novo);

    localStorage.setItem("projetos", JSON.stringify(salvos));

    alert("Projeto adicionado!");
}



function adicionarFormacao(event){

    event.preventDefault();

    const nova = {

        ano: document.getElementById("anoFormacao").value,
        curso: document.getElementById("cursoFormacao").value,
        instituicao: document.getElementById("instFormacao").value

    };

    let salvos = JSON.parse(localStorage.getItem("formacoes")) || [];

    salvos.push(nova);

    localStorage.setItem("formacoes", JSON.stringify(salvos));

    alert("Formação adicionada!");
}



function adicionarCertificado(event){

    event.preventDefault();

    const novo = {

        titulo: document.getElementById("tituloCert").value,
        instituicao: document.getElementById("instCert").value,
        categoria: document.getElementById("categoriaCert").value

    };

    let salvos = JSON.parse(localStorage.getItem("certificados")) || [];

    salvos.push(novo);

    localStorage.setItem("certificados", JSON.stringify(salvos));

    alert("Certificado adicionado!");
}



function adicionarExperiencia(event){

    event.preventDefault();

    const nova = {

        empresa: document.getElementById("empresaExp").value,
        periodo: document.getElementById("periodoExp").value,
        cargo: document.getElementById("cargoExp").value,
        desc: document.getElementById("descExp").value

    };

    let salvos = JSON.parse(localStorage.getItem("experiencias")) || [];

    salvos.push(nova);

    localStorage.setItem("experiencias", JSON.stringify(salvos));

    alert("Experiência adicionada!");
}



// LOAD

window.onload = function(){

    carregarCertificados();
    carregarFormacao();
    carregarProjetos();
    carregarExperiencia();
    carregarJanelaCodigo();

    const formProjeto = document.getElementById("formProjeto");
    if(formProjeto){
        formProjeto.addEventListener("submit", adicionarProjeto);
    }

    const formFormacao = document.getElementById("formFormacao");
    if(formFormacao){
        formFormacao.addEventListener("submit", adicionarFormacao);
    }

    const formCertificado = document.getElementById("formCertificado");
    if(formCertificado){
        formCertificado.addEventListener("submit", adicionarCertificado);
    }

    const formExperiencia = document.getElementById("formExperiencia");
    if(formExperiencia){
        formExperiencia.addEventListener("submit", adicionarExperiencia);
    }

};