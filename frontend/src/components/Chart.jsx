import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from './Loading';

export default function Chart({
    endpoint,
    label,
    keyName,
    keyValue,
    chartType
}) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/${endpoint}`);
                const data = response.data
                console.log(response)
                setChartData({
                    labels: data.map((d) => d[label]),
                    datasets: [
                        {
                            label: keyName,
                            data: data.map((data) => data[keyValue])
                        }
                    ]
                })
            } catch (e) {
                console.error(e)
            }
        }
        fetchData()
    }, [endpoint]);

    if (!chartData) return <Loading />

    switch (chartType) {
        case 'line':
            return <Line data={chartData} />
        case 'bar':
            return <Bar data={chartData} />
        default:
            return <Pie data={chartData} />
    }
}