import { useEffect, useState } from "react";
import 'chart.js/auto';
import axios from 'axios';
import Chart from './components/Chart';
import "./App.css";
import { getMonth } from './utils/date';

function App() {
  const intiialQueryState = {
    'year': '', 
    'month': '',
    'start': '',
    'end': ''
  }

  const initialDateOptionsState = {
    'years': [],
    'months': []
  }
  
  const [chart, setChart] = useState(null);
  const [queries, setQueries] = useState(intiialQueryState);
  const [chartType, setChartType] = useState('pie');
  const [dateOptions, setDateOptions] = useState(initialDateOptionsState)
  
  const action = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    setQueries({
      'year': formData.get('year'),
      'month': formData.get('month'),
      'start': formData.get('start'),
      'end': formData.get('end')
    })
    
    // e.target.reset()
  }
  
  const prepareChart = (chart) => {
    setChart(chart);
    setQueries(intiialQueryState);
  }
  
  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await axios.get('http://localhost:8000/date')
        setDateOptions(response.data)
      } catch (e) {
        console.error(e)
      }
    }
    getDate()
  }, []);

  const getEndpoint = (() => {
    const params = new URLSearchParams();
    if (queries.year) params.append('year', queries.year);
    if (queries.month) params.append('month', queries.month);
    if (queries.start) params.append('start', queries.start);
    if (queries.end) params.append('end', queries.end);

    return params.size > 0 ? `${chart}?${params.toString()}` : chart
  })()

  return (
    <main className="container">
      <li>
        <button onClick={() => prepareChart(null)}>
          Home
        </button>
        <button onClick={() => prepareChart('category')}>
          Category Sums
        </button>
        <button onClick={() => prepareChart('monthly')}>
          Monthly Sums
        </button>
        <button onClick={() => prepareChart('merchants')}>
          Top Merchants
        </button>
        <button onClick={() => prepareChart('daily')}>
          Daily Spending
        </button>
      </li>
      {chart && 
        <form onSubmit={action}>
          <label>Year</label>
          <select name='year'>
            {dateOptions.years.map(x => (
              <option key={x} value={x}>{x}</option>
            ))}
          </select>
          <label>Month</label>
          <select name='month'>
            {dateOptions.months.map(x => (
              <option key={x} value={x}>{getMonth(x)}</option>
            ))}
          </select>
          <button type='submit'>Filter</button>
        </form>}
      {chart && 
        <select onChange={(e) => {setChartType(e.target.value)}}>
          {}
          <option value='pie'>Pie</option>
          <option value='line'>Line</option>
          <option value='bar'>Bar</option>
        </select>}
      <section>
        {chart === 'category' && <Chart 
          endpoint={getEndpoint}
          label={'category'}
          keyName={'Total Amount'}
          keyValue={'amount'}
          chartType={chartType}
        />}

        {chart === 'monthly' && <Chart 
          endpoint={getEndpoint}
          label={'month'}
          keyName={'Total Amount'}
          keyValue={'amount'}
          chartType={chartType}
        />}

        {chart === 'merchants' && <Chart 
          endpoint={getEndpoint}
          label={'merchant'}
          keyName={'Total Amount'}
          keyValue={'amount'}
          chartType={chartType}
        />}

        {chart === 'daily' && <Chart 
          endpoint={getEndpoint}
          label={'date'}
          keyName={'Total Amount'}
          keyValue={'amount'}
          chartType={chartType}
        />}
      </section>
    </main>
  );
}

export default App;
