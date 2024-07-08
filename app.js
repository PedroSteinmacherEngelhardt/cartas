const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require("./server/routes/main"))

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});
