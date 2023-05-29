const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Sample data for the graph chart
const chartData = {
  last7days: [
    { name: 'Day 1', value: 10 },
    { name: 'Day 2', value: 20 },
    { name: 'Day 3', value: 30 },
    // Add more data for the last 7 days
  ],
  last15days: [
    { name: 'Day 1', value: 5 },
    { name: 'Day 2', value: 15 },
    { name: 'Day 3', value: 25 },
    // Add more data for the last 15 days
  ],
  month: [
    { name: 'Day 1', value: 2 },
    { name: 'Day 2', value: 12 },
    { name: 'Day 3', value: 22 },
    // Add more data for 1 month
  ],
};

// API endpoint to retrieve the chart data
app.get('/api/data', (req, res) => {
  const { selectedOption } = req.query;
  const data = chartData[selectedOption] || [];
  res.json(data);
});

// Start the server
const port = 3000; // You can change the port number if needed
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
