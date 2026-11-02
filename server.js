const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
res.send('Welcome to Techbridge TN!');
});

app.listen(PORT, () => {
console.log(`BridgeTech server running at http://localhost:${PORT}`);
});
