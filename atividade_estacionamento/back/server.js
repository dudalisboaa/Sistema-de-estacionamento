const express = require('express');
const cors = require('cors');
const connection = require('../back/db_config');
const app = express();

app.use(cors());
app.use(express.json());

const port = 2381;

app.post('/carros', (req, res) => {
    const { modelo, placa, cor } = req.body;
    const query = 'insert into carros (modelo, placa, cor) values (?, ?, ?)';
    connection.query(query, [modelo, placa, cor], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao inserir carro' });
        } res.json({ success: true, message: 'Produto inserido com sucesso!', id: result.insertId });
    })
})

// Listar carros (GET)
app.get('/carros', (req, res) => {
    connection.query('SELECT * FROM carros', (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

app.put('/carros/:id', (req, res) => {
    const { id } = req.params;
    const { modelo, placa, cor } = req.body;

    connection.query('UPDATE carros SET modelo=?, placa=?, cor=? WHERE id=?', 
        [modelo, placa, cor, id],
        (err, result) => {
            if (err) res.status(500).json({ error: err.message });
            else res.json({ message: 'Carro atualizado com sucesso' });
        }
    );
});

// Deletar carro (DELETE)
app.delete('/carros/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM carros WHERE id=?', [id], (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: 'Carro removido com sucesso' });
    });
});


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));