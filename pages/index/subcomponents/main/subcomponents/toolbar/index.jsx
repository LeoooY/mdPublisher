import { useState, useCallback,useReducer } from 'react';
import {cloneDeep } from 'lodash';
import { Button, Input, Modal } from 'antd';
import UploadCxt from '../upload'
import css from './index.less';

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
    const [modal,dispatchModal]=useReducer((state,action)=>{
        const newState=cloneDeep(state);
        switch(action.type){
            case 'show':
                newState.visible=true
                newState.title=action.data.title;
                return newState
            case 'hide':
                newState.visible=false
                return newState
            default:
                return state
        }
    },{
        visible:false,
        title:'新增'
    });
    
    const cancleModal=useCallback(()=>{
        dispatchModal({type:'hide'})
    },[dispatchModal])

    const showModal=useCallback((e,opt)=>{
        const {text}=opt
        dispatchModal({type:'show',data:{title:text}})
    },[dispatchModal])


    return (
        <div className={css.ToolBar}>
            {conf.map((el, idx) => {
                const { text, type, shape, marginRight } = el;
                return <Button key={idx}
                    type={type}
                    style={{ marginRight: marginRight || 10 }}
                    onClick={e=>showModal(e,{text})}
                    shape={shape}>
                    {text}
                </Button>
            })}
            <Search
                className={css.Search}
                enterButton />
            
            <Modal  
                visible={modal.visible}
                title={modal.title}
                getContainer={false}
                onCancel={cancleModal}>
                <UploadCxt/>
            </Modal>
        </div>
    )
}