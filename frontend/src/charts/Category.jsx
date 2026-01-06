import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CategoryPie() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/category_sums');
                const data = response.data
                setChartData({
                    labels: data.map((d) => d.category),
                    datasets: [
                        {
                            label: 'Amount',
                            data: data.map((data) => data.amount)
                        }
                    ]
                })
            } catch (e) {
                console.error(e)
            }
        }
        fetchData()
    }, []);

    if (!chartData) return <p>Loading bitch</p>
    
    return <Pie data={chartData}/>
}