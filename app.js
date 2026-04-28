const express = require("express");
const cors = require("cors");
const app = express();

// Middleware para processar JSON e permitir acesso do front-end (CORS)
app.use(express.json());
app.use(cors());

// Nossos "Bancos de Dados" em memória (Arrays)
let dados = {
    projetos: [
        { titulo: "Análise de Falhas", tech: "Python | Flask", desc: "Software para análise técnica de equipamentos.", link: "https://github.com/isabellymarinho20/Structured-process-for-failure-analysis.git", img: "img/petro.jpg" },
        { titulo: "Análise de Documentação", tech: "N8N | Gemini", desc: "Treinamento de IA via API.", link: "https://github.com/isabellymarinho20/analise_documentacao.git", img: "img/documen.jpg" },
        { titulo: "Censo IBGE SJC", tech: "HTML | CSS | Python", desc: "Visualização de dados para transparência.", link: "https://github.com/FATCK06/ProjectAPI_FirstSemester.git", img: "img/sjc.png" },
        { titulo: "Controle do almoxarifado de eletrônica ", tech: "HTML | CSS | JAVASCRIPT", desc: "Aplicação web para controlar o almoxarifado de eletronica.", link: "https://github.com/isabellymarinho20/Eletronics-Warehouse-Inventory-System-.git", img: "img/ele.jpg" },
        { titulo: "API para FastFood", tech: "JAVA", desc: "API em java para pedidos.", link: "https://github.com/isabellymarinho20/garagem.git", img: "img/fas.png" },
        { titulo: "IA para identificação de fogo e fumaça", tech: "Python | YOLO", desc: "IA para identificar fogo e fumaça.", link: "#", img: "img/fogo.jpg" }
    ],
    certificados: [
        { titulo: "Inglês Nível B1", instituicao: "TOEFL", categoria: "Internacional" },
        { titulo: "Desafio de Ideias ON", instituicao: "SENAI", categoria: "Tecnologia" },
        { titulo: "Python Essentials 1", instituicao: "Cisco", categoria: "Especialização" },
        { titulo: "Fundamentos FlutterFlow", instituicao: "NoCode", categoria: "Especialização" },
        { titulo: "Escola de Inovadores", instituicao: "INOVA CPS", categoria: "Especialização" },
        { titulo: "Introdução ao SCRUM", instituicao: "FGV", categoria: "Especialização" }
    ],
    formacoes: [
        { ano: "2025 — Cursando", curso: "Desenvolvimento de Software Multiplataforma", instituicao: "FATEC SJC" },
        { ano: "2024 — Cursando", curso: "Técnico em Desenvolvimento de Sistemas", instituicao: "SENAI SJC" },
        { ano: "2022 — 2024", curso: "Ensino Médio Técnico em Informática", instituicao: "UNIVAP" }
    ],
    experiencias: [
        { empresa: "Petrobras", periodo: "2024 — Atualmente", cargo: "Jovem Aprendiz", desc: "Curso de desenvolvimento de sistemas" },
        { empresa: "SanjaWorks", periodo: "2024 — 2025", cargo: "Estágio Técnico de Informática", desc: "Automações com N8N e IA" }
    ]
};

// --- ROTAS GENÉRICAS ---

// GET: Retorna a lista de uma categoria
app.get("/api/:categoria", (req, res) => {
    const { categoria } = req.params;
    if (dados[categoria]) {
        res.json(dados[categoria]);
    } else {
        res.status(404).json({ erro: "Categoria não encontrada" });
    }
});

// POST: Adiciona um novo item
app.post("/api/:categoria", (req, res) => {
    const { categoria } = req.params;
    if (dados[categoria]) {
        const novoItem = { id: Date.now(), ...req.body };
        dados[categoria].push(novoItem);
        res.status(201).json(novoItem);
    } else {
        res.status(404).json({ erro: "Categoria inválida" });
    }
});

// PUT: Atualiza um item pelo ID
app.put("/api/:categoria/:id", (req, res) => {
    const { categoria, id } = req.params;
    if (dados[categoria]) {
        const index = dados[categoria].findIndex(item => item.id == id);
        if (index !== -1) {
            dados[categoria][index] = { id: Number(id), ...req.body };
            res.json(dados[categoria][index]);
        } else {
            res.status(404).json({ erro: "Item não encontrado" });
        }
    }
});

// DELETE: Remove um item pelo ID
app.delete("/api/:categoria/:id", (req, res) => {
    const { categoria, id } = req.params;
    if (dados[categoria]) {
        dados[categoria] = dados[categoria].filter(item => item.id != id);
        res.status(204).send();
    } else {
        res.status(404).json({ erro: "Categoria inválida" });
    }
});



// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});