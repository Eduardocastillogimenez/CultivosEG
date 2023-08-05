import Chart from 'react-apexcharts'
import {ReactNode, useEffect, useState} from "react";

interface Cultivos {
    temperaturesMeasuredPerDayVegetables: any[];
    startDate: string;
    endDate: string;
}

function Graficas(props: Cultivos) {
    let [chartData, setChartData] = useState({
        options: {
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                categories: [] as any[]
            }
        },
        series: [{
            name: 'series-1',
            data:  [] as any[]
        }]
    });

    useEffect(() => {
        setChartData({
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    categories: props.temperaturesMeasuredPerDayVegetables.map(temp => {
                        return temp.date
                    }) as any[]
                }
            },
            series: [{
                name: 'series-1',
                data:  props.temperaturesMeasuredPerDayVegetables.map(temp => {
                    return temp.temperature
                }) as any[]
            }]
        });
    }, [ props.temperaturesMeasuredPerDayVegetables ])

    return (
        <div>
            <Chart options={chartData.options} series={chartData.series} type="bar" width={1100} height={320} />
        </div>
    );
}

export default Graficas;