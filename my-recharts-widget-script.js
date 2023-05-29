const { useState, useEffect } = React;

function MyComponent() {
  const [selectedOption, setSelectedOption] = useState('last7days');
  const [chartData, setChartData] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:3000/api/data')
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data to the chartData state
        setChartData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run the effect only once on component mount

  const renderGraph = () => {
    if (selectedOption === 'last7days') {
      return <canvas id="line-chart" width="400" height="300" />;
    } else if (selectedOption === 'last15days') {
      // Render chart for last 15 days
      return <canvas id="line-chart" width="400" height="300" />;
    } else if (selectedOption === '1month') {
      // Render chart for 1 month
      return <canvas id="line-chart" width="400" height="300" />;
    } else {
      return <div>No graph selected</div>;
    }
  };

  useEffect(() => {
    // Create and update the chart
    const ctx = document.getElementById('line-chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.map((item) => item.name),
        datasets: [
          {
            label: 'Value',
            data: chartData.map((item) => item.value),
            borderColor: '#8884d8',
            pointRadius: 4,
            pointHoverRadius: 8,
            fill: false,
          },
        ],
      },
      options: {
        // Add your chart options here
      },
    });
    // Cleanup the chart on component unmount
    return () => {
      chart.destroy();
    };
  }, [chartData]); // Re-render the chart whenever chartData changes

  return (
    <div className="widget-container">
      <div className="widget-header">Graph Widget</div>
      <div className="widget-dropdown">
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="last7days">Last 7 days</option>
          <option value="last15days">Last 15 days</option>
          <option value="1month">1 month</option>
        </select>
      </div>
      <div className="widget-graph">{renderGraph()}</div>
    </div>
  );
}

ReactDOM.render(
  <MyComponent />,
  document.getElementById('my-chartjs-widget-container')
);
