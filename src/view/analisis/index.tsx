import { useState, useEffect } from 'react';
import { firebaseConfig } from '../../context/firebaseConfig';
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import {ReactNode} from "react";
import moment from "moment";
import {OptimalTemperaturesPerVegetable} from "../../App";

interface Props {
    optimalTemperatures: OptimalTemperaturesPerVegetable[];
    startDate: string;
    endDate: string;
    daysCounter: number;
    averageTemperature: number;
}

function Analisis(props: Props) {

    let [temperatureAverage, setTemperatureAverage] = useState(0);
    let [vegetablesList, setVegetablesList] = useState([] as ReactNode);

    useEffect(() => {
        setVegetablesList(props.optimalTemperatures.filter(crop => {
            if(crop.maxTemperature >= props.averageTemperature && crop.minTemperature <= props.averageTemperature) {
                return crop
            }
        }).map((crop, index) =>  <li key={index}>{crop.name}</li>) as ReactNode);
    }, [ props.endDate ])

    return (
        <div>
            <p>
                El rango de fechas ({props.startDate}, {props.endDate}) cuenta con una temperatura promedio de {props.averageTemperature} Centigrados
            </p>
            <p>
                Los mejores cultivos para esta temperatura son:
            </p>
            <ul>{vegetablesList}</ul>
        </div>
    );
}

export default Analisis;