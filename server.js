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

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});