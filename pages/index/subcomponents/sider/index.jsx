import React, { useState, useEffect } from 'react';
import style from './index.less';

function Sider(props) {
    const { data } = props;

    const [example, setExample] = useState('initialValue');
    useEffect(() => {      
    });
    return (
      <div className={style.Sider}>Sider</div>
    )
}

export default Sider;