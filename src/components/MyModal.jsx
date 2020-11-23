import React, { useContext, useState } from 'react'
import 'antd/dist/antd.css';
import { Modal,Table,Space, Alert } from 'antd';
import { TableModalContext } from '../context/TableModalState'

export const MyModal = () => {

    const { modalState,resetModal} = useContext(TableModalContext);
    const visible=modalState.visible;

    // const showModal = () => {
    // //   this.setState({
    // //     visible: true,
    // //   });
    // };
  
    const handleOk = e => {
      console.log(e);
    //   this.setState({
    //     visible: false,
    //   });
    };
  
    const handleCancel = e => {
      console.log(e);
      resetModal();
    //   this.setState({
    //     visible: false,
    //   });
    };

  return (
    <div>
             <Modal
          title="Basic Modal"
          visible={modalState.visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
    </div>
  )
}

