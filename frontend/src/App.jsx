import { useEffect, useState } from "react";
import 'chart.js/auto';
import Chart from './components/Chart';
import "./App.css";
import CategoryPie from './charts/category';
import MonthlyLine from './charts/Monthly';

function App() {
  const [chart, setChart] = useState(null);
  const [chartType, setChartType] = useState('pie');

  return (
    <main className="container">
      <li>
        <button onClick={() => setChart('category_sums')}>
          Category Sums
        </button>
        <button onClick={() => setChart('monthly_sums')}>
          Monthly Sums
        </button>
      </li>
      <select onChange={(e) => setChartType(e.target.value)}>
          <option value='pie'>Pie</option>
          <option value='line'>Line</option>
          <option value='bar'>Bar</option>
      </select>
      <section>
        {chart === 'category_sums' && <Chart 
          endpoint={chart}
          label={'category'}
          keyName={'Total Amount'}
          keyValue={'amount'}
          chartType={chartType}
        />}

        {chart === 'monthly_sums' && <Chart 
          endpoint={chart}
          label={'month'}
          keyName={'Total Amount'}
          keyValue={'amount'}
          chartType={chartType}
        />}
      </section>
    </main>
  );
}

export default App;
