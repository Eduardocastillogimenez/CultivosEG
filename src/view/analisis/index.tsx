import { useState, useEffect } from 'react';
import { firebaseConfig } from '../../context/firebaseConfig';
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import {ReactNode} from "react";
import moment from "moment";

interface Props {
    cultivos?: Object;
    startDate?: string;
    endDate?: string;
    data: any;
}

interface Crop {
    name?: string,
    minTemperature: number,
    maxTemperature: number
}


function Analisis(props: Props) {
    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app);
    const starCountRef = ref(database, "Temperatures");

    let [temperatureAverage, setTemperatureAverage] = useState(0);
    let [vegetablesList, setVegetablesList] = useState([] as ReactNode);

    const cropTemperatures: Crop[] = [
        {
            name: "Maíz",
            minTemperature: 20,
            maxTemperature: 25
        },
        {
            name: "Frijo",
            minTemperature: 23,
            maxTemperature: 27
        },
        {
            name: "Zanahoria",
            minTemperature: 13,
            maxTemperature: 17
        },
        {
            name: "Tomate",
            minTemperature: 26,
            maxTemperature: 30
        },
        {
            name: "Papa",
            minTemperature: 16,
            maxTemperature: 21
        },
        {
            name: "Calabaza",
            minTemperature: 23.5,
            maxTemperature: 28
        },
        {
            name: "Cebolla",
            minTemperature: 16,
            maxTemperature: 20
        },
        {
            name: "Lechuga",
            minTemperature: 11,
            maxTemperature: 15
        },
        {
            name: "Espárragos",
            minTemperature: 18,
            maxTemperature: 22
        },
        {
            name: "Lechuga",
            minTemperature: 11,
            maxTemperature: 15
        },
        {
            name: "Platano",
            minTemperature: 28,
            maxTemperature: 35
        },
    ];

    useEffect(() => {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            let daysCounter = 0;
            const temperatureSum = data.reduce((accumulator: number, currentValue: any) => {
                if(moment(props.endDate).isSameOrAfter(currentValue.date) && moment(props.startDate).isSameOrBefore(currentValue.date)) {
                    daysCounter++;
                    return accumulator + currentValue.temperature
                }
                return accumulator
            },0);

            let temperatureAverageAux = Number((temperatureSum / daysCounter).toFixed(2))
            setTemperatureAverage(temperatureAverageAux)

            setVegetablesList(cropTemperatures.filter(crop => {
                if(crop.maxTemperature >= temperatureAverageAux && crop.minTemperature <= temperatureAverageAux) {
                    return crop
                }
            }).map((crop, index) =>  <li key={index}>{crop.name}</li>) as ReactNode);
        });
    }, [ props.endDate ])

    return (
        <div>
            <p>
                El rango de fechas ({props.startDate}, {props.endDate}) cuenta con una temperatura promedio de {temperatureAverage} Centigrados
            </p>
            <p>
                Los mejores cultivos para esta temperatura son:
            </p>
            <ul>{vegetablesList}</ul>
        </div>
    );
}

export default Analisis;