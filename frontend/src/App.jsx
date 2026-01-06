import { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import "./App.css";
import CategoryPie from './charts/category';
import MonthlyLine from './charts/Monthly';

function App() {
  const [graph, setGraph] = useState('')

  return (
    <main className="container">
      <li>
        <button onClick={() => setGraph('category_sums')}>
          Category Sums
        </button>
        <button onClick={() => setGraph('monthly_sums')}>
          Monthly Sums
        </button>
      </li>
      <section>
        {graph === 'category_sums' && <CategoryPie />}
        {graph === 'monthly_sums' && <MonthlyLine />}
      </section>
    </main>
  );
}

export default App;
