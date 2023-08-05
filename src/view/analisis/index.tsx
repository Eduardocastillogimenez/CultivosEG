// import { useState, useEffect } from 'react';
// import { firebaseConfig } from '../../context/firebaseConfig';
// import { initializeApp } from 'firebase/app'
// import { getDatabase, ref, onValue, get, child } from "firebase/database";
interface Props {
    cultivos?: Object;
    fecha?: string;
    data: any;
}
function Analisis(props: Props) {
    // let valor = [{
    //     date: "2020-01-01",
    //     id: "7gu8i941",
    //     temperature: 27.98,
    //     weather: "Cloudy"
    // }];
    // const [data, setData] = useState(valor);
    // const app = initializeApp(firebaseConfig)
    // const database = getDatabase(app);
    // const starCountRef = ref(database, "Temperatures");

    // let filteredData = [{
    //     date: "2020-01-01",
    //     id: "7gu8i941",
    //     temperature: 27.98,
    //     weather: "Cloudy"
    // }];

    // onValue(starCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     filteredData = data.filter((obj: { date: string }) => obj.date === props.fecha);
    //     setData(filteredData);
    //     console.log()
    // });
    // const dbRef = ref(getDatabase());
    // get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });


    return (
        <div>
            el dia {props.fecha} esta con una temperatura de { } y los mejores cultivos son los de { }
        </div>
    );
}

export default Analisis;