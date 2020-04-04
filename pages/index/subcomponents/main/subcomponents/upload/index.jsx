import { Upload, Button, Icon, message } from 'antd';
import { useCallback } from 'react';
import request from "@utils/request";

export default (props) => {
    const uploadProps = {
        name: 'mdfile',
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        action: 'http://localhost:3000/api/upload',
        headers: {
            authorization: 'authorization-text',
        },        
    }

    const onChange=useCallback((info) =>{
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }
    },[])

    const test=useCallback(()=>{
        request.get('api/upload')
    },[])

    return (
        <div>
            <Upload {...uploadProps} onChange={onChange}>
                <Button>
                    <Icon type="upload" /> 新增
                </Button>
            </Upload>
            <Button onClick={()=>test()} >测试</Button>
        </div>
    )
}