const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './data/experiencias.json';

// READ
router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(path));
    res.json(data);
});

// CREATE
router.post('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(path));

    data.push(req.body);

    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    res.json({ mensagem: "Experiência criada" });
});

// UPDATE
router.put('/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(path));

    data[req.params.id] = req.body;

    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    res.json({ mensagem: "Experiência atualizada" });
});

// DELETE
router.delete('/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync(path));

    data.splice(req.params.id, 1);

    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    res.json({ mensagem: "Experiência deletada" });
});

module.exports = router;