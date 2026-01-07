import { useEffect, useState } from "react";
import 'chart.js/auto';
import Chart from './components/Chart';
import "./App.css";

function App() {
  const [chart, setChart] = useState(null);
  const [endpoint, setEndpoint] = useState(null);
  const [queries, setQueries] = useState({'year': '', 'month': ''});
  const [chartType, setChartType] = useState('pie');

  const action = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    setQueries({
      'year': formData.get('year'),
      'month': formData.get('month')
    })
    
    e.target.reset()
  }

  const getEndpoint = (() => {
    const params = new URLSearchParams();
    if (queries.year) params.append('year', queries.year);
    if (queries.month) params.append('month', queries.month);
    console.log(queries)

    return params.size > 0 ? `${chart}?${params.toString()}` : chart
  })()

  return (
    <main className="container">
      <li>
        <button onClick={() => setChart('category')}>
          Category Sums
        </button>
        <button onClick={() => setChart('monthly')}>
          Monthly Sums
        </button>
        <button onClick={() => setChart('merchants')}>
          Top Merchants
        </button>
        <button onClick={() => setChart('daily')}>
          Daily Spending
        </button>
      </li>
      <form onSubmit={action}>
        <label htmlFor='year'>Year</label>
        <input type='text' name='year' />
        <label htmlFor='month'>Month</label>
        <input type='text' name='month' />
        <button type='submit'>Filter</button>
      </form>
      <select onChange={(e) => {setChartType(e.target.value)}}>
          <option value='pie'>Pie</option>
          <option value='line'>Line</option>
          <option value='bar'>Bar</option>
      </select>
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
