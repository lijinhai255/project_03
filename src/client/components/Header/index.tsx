import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  GithubFilled,
  CalendarOutlined,
} from '@ant-design/icons';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import Notice from '../Notice';
import { tabKeyRouterMap, GITHUB_URL } from '../../constants';
import { requestPvs, requestData ,getCssData} from '../../http/request';
import { AppContext } from '../../context/appContext';
import './styles.less';

const { useState, useEffect, useContext } = React;

const Header: React.FunctionComponent<RouteComponentProps> = ({
  history,
  location,
}) => {
  const gotoGithub = () => {
    window.location.href = GITHUB_URL;
  };
  const appState = useContext(AppContext);
  const [pvs, changePvs] = useState(0);

  const selectedYear = tabKeyRouterMap[location.pathname];
  console.log(selectedYear,"selectedYear-selectedYear")

  const requestDataWrapper = (year: string) => {
    appState.changeLoading(true);
    requestData(year, (allHouses: cdFang.IhouseData[]) => {
      appState.changeData(allHouses);
      appState.changeLoading(false);
    });
  };

  useEffect(() => {
    // 获取 pv
    requestPvs((pvNumber: number): void => {
      changePvs(pvNumber);
    });

    // 获取房源信息
    requestDataWrapper(selectedYear);
  }, []);

  // 根据理由选中对应 menu 项
  const defaultYear = [selectedYear];

  // 路由切换
  const clickMenu = ({ key }: { key: string }) => {
    if (key !== selectedYear) {
      history.push(tabKeyRouterMap[key]);
      // requestDataWrapper(key);
      // 获取CSS 数据 
      console.log(1212)
      getCssData((getCssData: cdFang.IhouseData[]) => {
        appState.changeData(getCssData);
        appState.changeLoading(false);
      })

    }
  };

  return (
    <div className="cdfang-header">
      <div className="cdfang-header-item">
        <span className="cdfang-header-item-pv">{`累计查询：${pvs}次`}</span>
        <Notice />
        <GithubFilled onClick={gotoGithub} />
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={defaultYear}
        onClick={clickMenu}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="home">
          <HomeOutlined />
          首页
        </Menu.Item>
        <Menu.Item key="CSS">
          <CalendarOutlined />
          获取CSS数据
        </Menu.Item>
        <Menu.Item key="JS">
          <CalendarOutlined />
          获取JS数据
        </Menu.Item>
        <Menu.Item key="Webpacke">
          <CalendarOutlined />
          获取Webpack数据
        </Menu.Item>
        <Menu.Item key="React">
          <CalendarOutlined />
          获取React数据
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default withRouter(Header);
