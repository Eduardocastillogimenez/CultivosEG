import Chart from 'react-apexcharts'
import {ReactNode, useEffect, useState} from "react";
import moment from "moment";

interface Cultivos {
    temperaturesMeasuredPerDayVegetables: any[];
    startDate: string;
    endDate: string;
}

function Graficas(props: Cultivos) {
    let [temperaturesChartData, setTemperaturesChartData] = useState({
        options: {
            chart: {
                id: 'Temperatura'
            },
            xaxis: {
                categories: [] as any[]
            },
            colors: ['#272829']
        },
        series: [{
            name: 'Temperatura',
            data:  [] as any[]
        }]
    });
    let [weatherChartData, setWeatherChartData] = useState({
        options: {
            chart: {
                id: 'Clima'
            },
            xaxis: {
                categories: [] as any[]
            },
            colors: ['#001C30']
        },
        series: [{
            name: 'Clima',
            data:  [] as any[]
        }]
    });

    useEffect(() => {
        setTemperaturesChartData({
            options: {
                chart: {
                    id: 'Temperatura'
                },
                xaxis: {
                    categories: props.temperaturesMeasuredPerDayVegetables.map(temp => {
                        return temp.date
                    }) as any[]
                },
                colors: ['#272829']
            },
            series: [{
                name: 'Temperatura',
                data:  props.temperaturesMeasuredPerDayVegetables.map(temp => {
                    return temp.temperature
                }) as any[]
            }]
        });

        setWeatherChartData({
            options: {
                chart: {
                    id: 'Clima'
                },
                xaxis: {
                    categories: ['Soleado', 'Nublado', 'Lluvioso']
                },
                colors: ['#001C30']
            },
            series: [{
                name: 'Cantidad de días',
                data:  [
                    props.temperaturesMeasuredPerDayVegetables.reduce((accumulator: number, currentValue: any) => {
                        if(currentValue.weather === 'Sunny') {
                             return accumulator + 1
                        }
                        return accumulator
                    },0),
                    props.temperaturesMeasuredPerDayVegetables.reduce((accumulator: number, currentValue: any) => {
                        if(currentValue.weather === 'Cloudy') {
                            return accumulator + 1
                        }
                        return accumulator
                    },0),
                    props.temperaturesMeasuredPerDayVegetables.reduce((accumulator: number, currentValue: any) => {
                        if(currentValue.weather === 'Rainy') {
                            return accumulator + 1
                        }
                        return accumulator
                    },0)
                ]  as any[]
            }]
        });

    }, [ props.temperaturesMeasuredPerDayVegetables ])

    return (
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
            <h3>Temperatura VS Días</h3>
            <Chart options={temperaturesChartData.options} series={temperaturesChartData.series} type="line" width={1100} height={320} />
            <section style={{marginTop: "1rem", marginBottom: "1rem", height: "2px"}}></section>
            <h3>Cantidad De Días Lluviosos, Solreados y Nublados</h3>
            <Chart options={weatherChartData.options} series={weatherChartData.series} type="bar" width={1100} height={320} />
        </div>
    );
}

export default Graficas;