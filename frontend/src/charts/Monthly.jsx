import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MonthlyLine() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/monthly_sums');
                const data = response.data
                console.log(data)
                setChartData({
                    labels: data.map((d) => d.Month),
                    datasets: [
                        {
                            label: 'Amount',
                            data: data.map((data) => data.Amount)
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
    
    return <Line data={chartData}/>
}