import { Button, Row, Col } from 'antd';
import request from '@utils/request';
import style from './index.less';
import './index.css';
import Main from './subcomponents/main';
import Header from './subcomponents/header';
import Sider from './subcomponents/sider';

export default () => {
    return (
        <div className={style.Home}>
            <Sider />
            <div className={style.HomeMain}>
                <Header />
                <Main />
            </div>
        </div>
    )
}