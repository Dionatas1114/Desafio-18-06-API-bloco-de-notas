const express = require('express');
const database = require('./database');

const server = express();

server.use(express.json());

const notes = [];

function verifyData(req, res, next) {
    const { tittle, content, hour, date } = req.body;

    if (!tittle) {
        return res.json({
            error: 'Insira um título'
        });

    } else if (!content) {
        return res.json({
            error: 'Insira um conteúdo'
        });
    } else if (!hour) {
        return res.json({
            error: 'Insira um horário'
        });
    } else if (!date) {
        return res.json({
            error: 'Insira uma data'
        });
    }

    next();
}

server.get('/', (req, res) => {
    return res.json({ result: 'Bem vindo ao Bloco de notas (API com Banco de Dados)' });
});

server.get('/notes', (req, res) => {
    return res.json({ notes });
});

server.get('/notes/:id', async(req, res) => {

    const { id } = req.params;

    return res.json({
        result: 'nota encontrada',
        note: notes[id]
    });
});

server.post('/notes', verifyData, (req, res) => {

    const { tittle, content, hour, date } = req.body;

    const note = {
        tittle,
        content,
        hour,
        date
    };

    notes.push(note);

    return res.json({
        result: 'dado inserido com sucesso',
        note
    });
});

server.put('/notes/:id', verifyData, (req, res) => {

    const { tittle, content, hour, date } = req.body;
    const { id } = req.params;

    const note = {
        tittle,
        content,
        hour,
        date
    };

    notes[id] = note;

    return res.json({
        result: 'Nota atualizada com sucesso!',
        note: note
    });
});

server.delete('/notes/:id', async(req, res) => {
    const { tittle, content, hour, date } = req.body;
    const { id } = req.params;

    const note = {
        tittle,
        content,
        hour,
        date
    };

    notes[id] = note;

    return res.json({
        result: 'Nota excluída com sucesso!',
    });
});

server.listen(process.env.PORT);