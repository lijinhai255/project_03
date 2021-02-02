import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { Layout, Col, Row, Tabs } from 'antd';
import { RouteComponentProps } from 'react-router';

import utils from '../../utils';
import BasicAreaGraph from '../../components/BasicAreaGraph';
import WholeTable from '../../components/WholeTable';
import StatisticCard from '../../components/StatisticCard';
import Rank from '../../components/Rank';
import BasicColumnGraph from '../../components/BasicColumnGraph';
import { AppContext } from '../../context/appContext';
import * as constants from '../../constants';
import './styles.less';

const { lazy, useContext } = React;
const { TabPane } = Tabs;
const { Content } = Layout;
const CurrentHouse = lazy(() => import('../../components/CurrentHouse'));

interface ImonthHouse {
  month: string;
  [constants.HOUSE_NUMBER]: number;
}

interface ImonthBuilder {
  month: string;
  [constants.BUILDER_NUMBER]: number;
}

const Home: React.FunctionComponent<RouteComponentProps> = () => {
  const { allData } = useContext(AppContext);

  // 构建区域图需要的数据
  const arrayByDay = _.groupBy(allData, (item) =>
    dayjs(item.beginTime).format('YYYY-MM')
  );

  const houseData: ImonthHouse[] = [];
  const builderData: ImonthBuilder[] = [];
  Object.keys(arrayByDay)
    .sort()
    .forEach((key) => {
      const houseNumber = _.sumBy(arrayByDay[key], 'number');
      builderData.push({
        month: key,
        [constants.BUILDER_NUMBER]: arrayByDay[key].length,
      });
      houseData.push({
        month: key,
        [constants.HOUSE_NUMBER]: houseNumber,
      });
    });

  // 构建排行数据
  const builderRankData = builderData.map((item) => ({
    _id: utils.getRandomId(),
    name: item.month,
    number: item[constants.BUILDER_NUMBER],
  }));
  const houseRankData = houseData.map((item) => ({
    _id: utils.getRandomId(),
    name: item.month,
    number: item[constants.HOUSE_NUMBER],
  }));

  // 柱状图数据
  const { chartHouseData, chartBuilderData } = utils.getBasicColumnGraphData(
    allData
  );

  return (
    <Content className="content">
      <div>这是首页</div>
     
    </Content>
  );
};

export default Home;
