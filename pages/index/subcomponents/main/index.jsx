import { Icon } from 'antd';
import ToolBar from './subcomponents/toolbar';
import style from './index.less';

export default () => {
    return (
        <div className={style.Main}>
            <ToolBar />
            <div className={style.FileContainer}>
                {
                    [1, 2, 3, 4, 5].map((el, idx) => {
                        return <div className={style.FileItem} key={idx}>
                            <div>
                                <Icon type="file-markdown" style={{ fontSize: 64 }} />
                            </div>
                            <div className={style.FileName}>文件名</div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}