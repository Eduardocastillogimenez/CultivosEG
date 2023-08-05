import React, { useState, useEffect } from 'react';
import './App.css';
import './App.less';
import { firebaseConfig } from './context/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, get } from "firebase/database";
import type { DatePickerProps } from 'antd';
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

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const cultivos = {
  maiz: {
    temperaturaOptima: 20,
    climaPreferido: "soleado",
  },
  frijoles: {
    temperaturaOptima: 25,
    climaPreferido: "lluvioso",
  },
  zanahorias: {
    temperaturaOptima: 15,
    climaPreferido: "soleado",
  },
  tomate: {
    temperaturaOptima: 28,
    climaPreferido: "soleado",
  },
  papa: {
    temperaturaOptima: 17,
    climaPreferido: "nublado",
  },
  calabaza: {
    temperaturaOptima: 25,
    climaPreferido: "caluroso",
  },
  cebolla: {
    temperaturaOptima: 18,
    climaPreferido: "nublado",
  },
  lechuga: {
    temperaturaOptima: 13,
    climaPreferido: "nublado",
  },
  esparragos: {
    temperaturaOptima: 20,
    climaPreferido: "nublado",
  },
  zanahoria: {
    temperaturaOptima: 23,
    climaPreferido: "soleado",
  },
  platano: {
    temperaturaOptima: 30,
    climaPreferido: "soleado",
  }
};

function App() {
  const [data, setData] = useState({ Temperatures: 0 });
  const app = initializeApp(firebaseConfig)
  // const firebase = useFirebaseApp();
  // const db = getFirestore();
  // const colRef = collection(db, "Real Time DataBase");

  const database = getDatabase(app);
  // var firebaseRef = database().ref("Temperature");
  // console.log(firebaseRef)

  // getDocs(colRef).then((e) => console.log(e))
  useEffect(() => {
    let a = true;
    if (a) {
      a = false;
      const promi = ref(getDatabase());
      get(promi).then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }

  }, []);

  // const starCountRef = ref(database, "Temperatures");
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   // console.log(data)
  // });



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
        setseccion('principal');
        break;
      case '2':
        setseccion('analisis');
        break;
      case '3':
        setseccion('graficas');
        break;
      default:
        setseccion('principal');
    }
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setFecha(dateString);
  };

  const [collapsed, setCollapsed] = useState(false);
  const [seccion, setseccion] = useState("principal");
  const [fecha, setFecha] = useState("2023-05-05");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dateFormat = 'YYYY-MM-DD';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />

        <Menu onClick={onClick} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, alignItems: "end" }} >
          <DatePicker onChange={onChange} defaultValue={dayjs('2023-05-05', dateFormat)} format={dateFormat} />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{seccion}</Breadcrumb.Item>
          </Breadcrumb>
          {data.Temperatures === 0 ? <Spin /> : seccion === "principal" ? <Principal cultivos={cultivos} /> :
            seccion === "analisis" ? <Analisis cultivos={cultivos} fecha={fecha} data={data.Temperatures === 0 ? [] : data.Temperatures} /> :
              <Graficas cultivos={cultivos} />}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Gabriel y Eduardo</Footer>
      </Layout>
    </Layout>

  );
}

export default App;
