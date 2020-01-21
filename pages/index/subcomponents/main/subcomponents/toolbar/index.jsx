import css from './index.less';
import { Button, Input } from 'antd';
const { Search } = Input;

const conf = [
    {
        text: "新增",
        type: "primary",
    },
    {
        text: "编辑",
    },
    {
        text: "上传",
    }
]
export default () => {
    return (
        <>
        <div className={css.ToolBar}>
            {conf.map((el, idx) => {
                const { text, type, shape, marginRight } = el;
                return <Button key={idx}
                    type={type}
                    style={{ marginRight: marginRight || 10 }}
                    shape={shape}>
                    {text}
                </Button>
            })}
            <Search 
                className={css.Search}
                enterButton/>    
        </div>
        
        </>
    )
}