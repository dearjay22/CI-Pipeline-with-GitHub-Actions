const express = require('express');
const calc = require('./calc');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// /calc expects JSON: { "op": "add", "a": 5, "b": 3 }
app.post('/calc', (req, res) => {
  const { op, a, b } = req.body;
  try {
    let result;
    switch (op) {
      case 'add': result = calc.add(a, b); break;
      case 'sub': result = calc.sub(a, b); break;
      case 'mul': result = calc.mul(a, b); break;
      case 'div': result = calc.div(a, b); break;
      case 'isPrime': result = calc.isPrime(a); break;
      default: return res.status(400).json({ error: 'unknown op' });
    }
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server listening on ${port}`));
}

module.exports = app;
