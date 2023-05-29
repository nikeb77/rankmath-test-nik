const { useState, useEffect } = React;

function MyComponent() {
  const [selectedOption, setSelectedOption] = useState('last7days');
  const [chartData, setChartData] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    // Fetch data from the API
    fetch(`http://localhost:3000/api/data?selectedOption=${selectedOption}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data to the chartData state
        setChartData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [selectedOption]); // Fetch data whenever the selected option changes

  const renderGraph = () => {
    if (selectedOption === 'last7days' || selectedOption === 'last15days' || selectedOption === 'month') {
      return React.createElement('canvas', { id: 'line-chart', width: '400', height: '300' });
    } else {
      return React.createElement('div', null, 'No graph selected');
    }
  };

  useEffect(() => {
    // Create and update the chart
    const ctx = document.getElementById('line-chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.map((data) => data.name),
        datasets: [
          {
            label: 'Value',
            data: chartData.map((data) => data.value),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    // Cleanup the chart on component unmount
    return () => {
      chart.destroy();
    };
  }, [chartData]); // Re-render the chart whenever chartData changes

  return React.createElement(
    'div',
    { className: 'widget-container' },
    React.createElement('div', { className: 'widget-header' }, 'Graph Widget'),
    React.createElement(
      'div',
      { className: 'widget-dropdown' },
      React.createElement(
        'select',
        { value: selectedOption, onChange: handleOptionChange },
        React.createElement('option', { value: 'last7days' }, 'Last 7 days'),
        React.createElement('option', { value: 'last15days' }, 'Last 15 days'),
        React.createElement('option', { value: 'month' }, '1 month')
      )
    ),
    React.createElement('div', { className: 'widget-graph' }, renderGraph())
  );
}

ReactDOM.render(
  React.createElement(MyComponent, null),
  document.getElementById('my-chartjs-widget-container')
);
