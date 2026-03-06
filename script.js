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
    
    // Criando a estrutura idêntica ao seu HTML original
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

// Não esqueça de chamar a função dentro do window.onload
window.onload = function() {
    carregarCertificados();
    carregarFormacao();
    carregarProjetos();
    carregarExperiencia();
    carregarJanelaCodigo(); // <-- Nova função aqui
};




//Certificado
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
    let html = "";

    for (let i = 0; i < Certificados.length; i++) {
        const cert = Certificados[i];
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


//formacoes
const Formacoes = [
    { ano: "2025 — Cursando", curso: "Desenvolvimento de Software Multiplataforma", instituicao: "FATEC SJC" },
    { ano: "2024 — Cursando", curso: "Técnico em Desenvolvimento de Sistemas", instituicao: "SENAI SJC" },
    { ano: "2022 — 2024", curso: "Ensino Médio Técnico em Informática", instituicao: "UNIVAP" }
];

function carregarFormacao() {
    const timeline = document.querySelector('.timeline');
    let html = "";
    for (let i = 0; i < Formacoes.length; i++) {
        const f = Formacoes[i];
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


//projetos
const Projetos = [
    { titulo: "Análise de Falhas", tech: "Python | Flask", desc: "Software para análise técnica de equipamentos.", link: "https://github.com/isabellymarinho20/Structured-process-for-failure-analysis.git", img: "img/petro.jpg" },
    { titulo: "Análise de Documentação", tech: "N8N | Gemini", desc: "Treinamento de IA via API.", link: "https://github.com/isabellymarinho20/analise_documentacao.git", img: "img/documen.jpg" },
    { titulo: "Censo IBGE SJC", tech: "HTML | CSS | Python", desc: "Visualização de dados para transparência.", link: "https://github.com/FATCK06/ProjectAPI_FirstSemester.git", img: "img/sjc.png" },
    { titulo: "Controle do almoxarifado de eletrônica ", tech: "HTML | CSS | JAVASCRIPT", desc: "Aplicação web para controlar o almoxarifado de eletronica do Colégio Univap da Unidade Centro.", link: "https://github.com/isabellymarinho20/Eletronics-Warehouse-Inventory-System-.git", img: "img/ele.jpg" },
  { titulo: "API para FastFood", tech: "JAVA", desc: "API em java para realiação de pedidos em um fastfood.", link: "https://github.com/isabellymarinho20/garagem.git", img: "img/fas.png" },
  { titulo: "IA para identificação de fogo e fumaça", tech: "Python | YOLO", desc: "No Desafio de Ideias do SENAI, foi proposto treinar uma IA para identificar fogo e fumaça.", link: "#", img: "img/fogo.jpg" }
  ];


function carregarProjetos() {
    const grid = document.querySelector('.projects-grid');
    let html = "";
    for (let i = 0; i < Projetos.length; i++) {
        const p = Projetos[i];
        html += `
            <div class="project-card">
                <div class="project-image"><img src="${p.img}" alt="${p.titulo}"></div>
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



//experiencias
const Experiencias = [
    { empresa: "Petrobras", periodo: "2024 — Atualmente", cargo: "Jovem Aprendiz", desc: "Curso de desenvolvimento de sistemas" },
    { empresa: "SanjaWorks", periodo: "2024 — 2025", cargo: "Estágio Técnico de Informática", desc: "Automações com N8N e IA, atendimento de IA pelo WhatsApp" }
];

function carregarExperiencia() {
    const container = document.querySelector('.exp-container');
    let html = "";
    for (let i = 0; i < Experiencias.length; i++) {
        const e = Experiencias[i];
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





// Funcao para validar o formulário
function validarFormulario(event) {
    event.preventDefault(); //verifica ates

    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('message').value;
    const status = document.getElementById('form-status');

    if (nome === "" || email === "" || mensagem === "") {
        // Mensagem caso campo esteja vazio
        status.innerHTML = "<p style='color: #ff5f56; margin-top: 10px;'>Por favor, preencha todos os campos!</p>";
    } else {
        status.innerHTML = "<p style='color: #32b4c5; margin-top: 10px;'>Obrigada, " + nome + "! Mensagem enviada com sucesso.</p>";
        document.getElementById('contact-form').reset();
    }
}


// Executa as funções quando a página carrega
window.onload = function() {
    carregarCertificados(); 
    carregarFormacao();
    carregarProjetos();
    carregarExperiencia();
    carregarJanelaCodigo();

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', validarFormulario);
    }
};

