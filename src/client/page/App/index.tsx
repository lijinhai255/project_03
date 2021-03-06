import * as React from 'react';
import { Layout, BackTop } from 'antd';
import Header from '../../components/Header';

import { COPYRIGHT, BEIAN_ICP } from '../../constants';

import './style.less';

const App: React.FunctionComponent = ({ children }) => (
  <div>
    <BackTop />
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      {children}
      <Layout.Footer style={{ textAlign: 'center' }}>
        {/* <div>
          <a href="http://www.beian.miit.gov.cn/" target="blank">
            {BEIAN_ICP}
          </a>
        </div>
        <div>{COPYRIGHT}</div> */}
      </Layout.Footer>
    </Layout>
  </div>
);

export default App;