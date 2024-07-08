const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

let lobbies = { '32': 'aiou' }

router.get('/lobby', (req, res) => {
    const id = req.query['id'];

    console.log(id);

    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

router.get('/get-heading', (req, res) => {
    const filePath = path.join(__dirname, '../../public', 'heading.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});

router.get('/lobby/game/card', (req, res) => {
    const filePath = path.join(__dirname, '../../public/game', 'card.js');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.type('application/javascript');
        res.send(data);
    });
});

router.get('/lobby/game/mains.js', (req, res) => {
    const filePath = path.join(__dirname, '../../public/game', 'mains.js');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.type('application/javascript');
        res.send(data);
    });
});

router.get('/lobby/game/style.css', (req, res) => {
    const filePath = path.join(__dirname, '../../public/game', 'style.css');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.type('text/css');
        res.send(data);
    });
});

module.exports = router;