import { useEffect, useState } from "react";
import 'chart.js/auto';
import Chart from './components/Chart';
import "./App.css";

function App() {
  const [chart, setChart] = useState(null);
  const [chartType, setChartType] = useState('pie');

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
      </li>
      <select onChange={(e) => setChartType(e.target.value)}>
          <option value='pie'>Pie</option>
          <option value='line'>Line</option>
          <option value='bar'>Bar</option>
      </select>
      <section>
        {chart === 'category' && <Chart 
          endpoint={chart}
          label={'category'}
          keyName={'Total Amount'}
          keyValue={'amount'}
          chartType={chartType}
        />}

        {chart === 'monthly' && <Chart 
          endpoint={chart}
          label={'month'}
          keyName={'Total Amount'}
          keyValue={'amount'}
          chartType={chartType}
        />}

        {chart === 'merchants' && <Chart 
          endpoint={chart}
          label={'merchant'}
          keyName={'Total Amount'}
          keyValue={'amount'}
          chartType={chartType}
        />}
      </section>
    </main>
  );
}

export default App;
