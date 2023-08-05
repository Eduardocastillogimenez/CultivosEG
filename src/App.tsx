import React, { useState, useEffect } from 'react';
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

const { RangePicker } = DatePicker;

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

  const database = getDatabase(app);

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

  const onChange: TimeRangePickerProps['onChange'] = (dates, stringDates) => {
    setStartDate(stringDates[0])
    setEndDate(stringDates[1]);
  };

  const [collapsed, setCollapsed] = useState(false);
  const [section, setSection] = useState("principal");
  const [startDate, setStartDate] = useState("2023-05-05");
  const [endDate, setEndDate] = useState("2023-05-05");
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
          <RangePicker onChange={onChange} format={dateFormat} />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{section}</Breadcrumb.Item>
          </Breadcrumb>
          {data.Temperatures === 0 ? <Spin /> : section === "principal" ? <Principal cultivos={cultivos} /> :
            section === "analisis" ? <Analisis cultivos={cultivos} startDate={startDate} endDate={endDate} data={data.Temperatures === 0 ? [] : data.Temperatures} /> :
              <Graficas cultivos={cultivos} />}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Gabriel y Eduardo</Footer>
      </Layout>
    </Layout>

  );
}

export default App;
