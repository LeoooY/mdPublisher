import { Upload, Button, Icon } from 'antd';


export default (props) => {
    return (
        <div>
            <Upload {...props}>
                <Button>
                    <Icon type="upload" /> 新增
                </Button>
            </Upload>,                      
        </div>
    )
}