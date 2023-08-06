import { useState, useEffect } from 'react';
import { firebaseConfig } from '../../context/firebaseConfig';
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import {ReactNode} from "react";
import moment from "moment";
import {OptimalTemperaturesPerVegetable} from "../../App";

interface Props {
    optimalTemperatures: OptimalTemperaturesPerVegetable[];
    temperaturesMeasuredPerDayVegetables: any[];
    startDate: string;
    endDate: string;
    daysCounter: number;
    averageTemperature: number;
}

function Analisis(props: Props) {

    let [temperatureAverage, setTemperatureAverage] = useState(0);
    let [vegetablesList, setVegetablesList] = useState([] as ReactNode);
    let [commonDay, setCommonDay] = useState([] as ReactNode);

    useEffect(() => {
        setVegetablesList(props.optimalTemperatures.filter(crop => {
            if(crop.maxTemperature >= props.averageTemperature && crop.minTemperature <= props.averageTemperature) {
                return crop
            }
        }).map((crop, index) =>  <li key={index}>{crop.name}</li>) as ReactNode);

        const sunnyDays = props.temperaturesMeasuredPerDayVegetables.reduce((accumulator: number, currentValue: any) => {
            if(currentValue.weather === 'Sunny') {
                return accumulator + 1
            }
            return accumulator
        },0)
        const cloudyDays = props.temperaturesMeasuredPerDayVegetables.reduce((accumulator: number, currentValue: any) => {
            if(currentValue.weather === 'Cloudy') {
                return accumulator + 1
            }
            return accumulator
        },0)
        const rainyDays = props.temperaturesMeasuredPerDayVegetables.reduce((accumulator: number, currentValue: any) => {
            if(currentValue.weather === 'Rainy') {
                return accumulator + 1
            }
            return accumulator
        },0)

        if(sunnyDays > cloudyDays && sunnyDays > rainyDays) {
            setCommonDay("Soleado")
        }
        if(cloudyDays > sunnyDays && cloudyDays > rainyDays) {
            setCommonDay("Nublado")
        }
        if(rainyDays > cloudyDays && rainyDays > sunnyDays) {
            setCommonDay("Lluvioso")
        }

    }, [ props.endDate ])

    return (
        <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column"}}>
            <h1 style={{margin: "50px 0 0 0", fontWeight: "500"}}>Temperatura Promedio</h1>
            <p style={{margin: "0px"}}>
                {props.averageTemperature} Centigrados
            </p>
            <h1 style={{margin: "50px 0 0 0", fontWeight: "500"}}>
                Mejores Cultivos para la fecha
            </h1>
            <p style={{margin: "5px 0 0 0"}}>{vegetablesList}</p>
            <h1 style={{margin: "50px 0 0 0", fontWeight: "500"}}>
                Tipo de día mas común
            </h1>
            <p>{commonDay}</p>
        </div>
    );
}

export default Analisis;