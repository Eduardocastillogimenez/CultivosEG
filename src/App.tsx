import React, {useState, useEffect, ReactNode} from 'react';
import './App.css';
import './App.less';
import { firebaseConfig } from './context/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, get } from "firebase/database";
import type { TimeRangePickerProps } from 'antd';
import { DatePicker, Spin } from 'antd';
import dayjs from 'dayjs';

import Principal from './view/principal';
import Analisis from './view/analisis';
import Graficas from './view/graficas';

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import moment from "moment/moment";

const { RangePicker } = DatePicker;

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export interface OptimalTemperaturesPerVegetable {
  name: string,
  minTemperature: number,
  maxTemperature: number
}

export interface TemperaturesMeasuredPerDayVegetables {
  name: string,
  temperature: number
  date: string
}

// export interface

function App() {
  const [data, setData] = useState({ Temperatures: 0 });
  const app = initializeApp(firebaseConfig)
  const database = getDatabase(app);
  const starCountRef = ref(database, "Temperatures");

  const optimalTemperatures: OptimalTemperaturesPerVegetable[] = [
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

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Principal', '1', <FileOutlined />),
    getItem('Analisis', '2', <DesktopOutlined />),
    getItem('Graficas', '3', <PieChartOutlined />),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case '1':
        setSection('principal');
        break;
      case '2':
        setSection('analisis');
        break;
      case '3':
        setSection('graficas');
        break;
      default:
        setSection('principal');
    }
  };

  const [collapsed, setCollapsed] = useState(false);
  const [section, setSection] = useState("principal");
  const [startDate, setStartDate] = useState("2023-05-05");
  const [endDate, setEndDate] = useState("2023-05-05");

  const onChange: TimeRangePickerProps['onChange'] = (dates, stringDates) => {
    setStartDate(stringDates[0])
    setEndDate(stringDates[1]);
  };

  const [temperaturesMeasuredPerDayVegetables,
    setTemperaturesMeasuredPerDayVegetables] =
      useState([] as TemperaturesMeasuredPerDayVegetables[]);

  const [temperaturesMeasuredPerDayVegetablesFirebaseData,
    setTemperaturesMeasuredPerDayVegetablesFirebaseData] =
      useState([] as TemperaturesMeasuredPerDayVegetables[]);

  const [averageTemperature, setAverageTemperatures] = useState(0);
  const [daysCounter, setDaysCounter] = useState(0);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dateFormat = 'YYYY-MM-DD';

  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    if(data.length !== temperaturesMeasuredPerDayVegetablesFirebaseData.length) {
      setTemperaturesMeasuredPerDayVegetablesFirebaseData(data)
    }
  });

  useEffect(() => {
    let daysCounterAux = 0
    const temperatureSum = temperaturesMeasuredPerDayVegetablesFirebaseData.reduce((accumulator: number, currentValue: any) => {
      if(moment(endDate).isSameOrAfter(currentValue.date) && moment(startDate).isSameOrBefore(currentValue.date)) {
        daysCounterAux++;
        return accumulator + currentValue.temperature
      }
      return accumulator
    },0);

    setDaysCounter(daysCounterAux);
    let averageTemperaturesAux = Number((temperatureSum / daysCounterAux).toFixed(2))
    setAverageTemperatures(averageTemperaturesAux)

    setTemperaturesMeasuredPerDayVegetables(temperaturesMeasuredPerDayVegetablesFirebaseData.filter(measurement => {
      if(moment(endDate).isSameOrAfter(measurement.date) && moment(startDate).isSameOrBefore(measurement.date)) {
        return true;
      }
    }))
  }, [ endDate ])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu onClick={onClick} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, alignItems: "end" }} >
          <RangePicker onChange={onChange} format={dateFormat} />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0', fontSize: "35px", fontWeight: "semi-bold", borderBottom: "1px solid #DDE6ED"}}>
            <Breadcrumb.Item>{ section.charAt(0).toUpperCase() + section.slice(1) }</Breadcrumb.Item>
          </Breadcrumb>
          {temperaturesMeasuredPerDayVegetables.length === 0 ?
              <h2 style={{margin: "50px 0 0 0", fontWeight: "500", textAlign: "center"}}>Selecciona un rango de fechas</h2>:
              section === "principal" ? <Principal /> :
            section === "analisis" ? <Analisis
                    temperaturesMeasuredPerDayVegetables={temperaturesMeasuredPerDayVegetables}
                    startDate={startDate}
                    endDate={endDate}
                    daysCounter={daysCounter}
                    optimalTemperatures={optimalTemperatures}
                    averageTemperature={averageTemperature} /> :
              <Graficas
                  temperaturesMeasuredPerDayVegetables={temperaturesMeasuredPerDayVegetables}
                  startDate={startDate}
                  endDate={endDate}
              />
          }
        </Content>
        <Footer style={{ textAlign: 'center' }}>Gabriel y Eduardo</Footer>
      </Layout>
    </Layout>

  );
}

export default App;
