const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));


// ROTAS
app.use('/api/projetos', require('./routes/projetos'));
app.use('/api/certificados', require('./routes/certificados'));
app.use('/api/formacoes', require('./routes/formacoes'));
app.use('/api/experiencias', require('./routes/experiencias'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});