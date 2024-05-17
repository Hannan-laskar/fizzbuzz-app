const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/fizzbuzz', (req, res) => {
  const { values } = req.body;
  if (!Array.isArray(values)) {
    return res.status(400).send('Invalid input');
  }

  const results = values.map(value => {
    if (typeof value === 'number') {
      const log = [];
      if (value % 3 === 0 && value % 5 === 0) return { value, result: 'FizzBuzz' };
      if (value % 3 === 0) return { value, result: 'Fizz' };
      if (value % 5 === 0) return { value, result: 'Buzz' };
      log.push(`Divided ${value} by 3`);
      log.push(`Divided ${value} by 5`);
      return { value, result: log };
    }
    return { value, result: 'Invalid Item' };
  });

  res.json(results);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
