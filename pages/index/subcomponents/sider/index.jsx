import React, { useState, useEffect } from 'react';
import UserInfo from './subcomponents/userinfo';

import style from './index.less';

function Sider(props) {
    const { data } = props;

    const [example, setExample] = useState('initialValue');
    useEffect(() => {      
    });
    return (
      <div className={style.Sider}>
          <UserInfo/>
      </div>
    )
}

export default Sider;