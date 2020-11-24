import React, { useContext, useState } from 'react'
import 'antd/dist/antd.css';
import { Modal, Table, Space, Alert } from 'antd';
import { TableModalContext } from '../context/TableModalState'
import { PeriodContext } from '../context/PeriodState'

export const MyModal = ({resultFunction}) => {

  const {splitCashFlowTransaction} = useContext(PeriodContext);
  const { modalState, resetModal ,handleChangeValues} = useContext(TableModalContext);
  const { visible, modalTransactions } = modalState;
  // const [amounts, setAmount] = useState([modalState.value]);
  const amounts=modalTransactions;

  // const showModal = () => {
  // //   this.setState({
  // //     visible: true,
  // //   });
  // };

  const handleOk = e => {
    console.log(e);
    splitCashFlowTransaction(modalState.id,modalTransactions);
    resultFunction(amounts);
    resetModal();
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


  const handleChange = (e) => {
    // const inputId=e.target.name;
    // let arr = [...amounts] 
    // arr[inputId]=e.target.value;  
    // setAmount(arr);
    handleChangeValues(e.target.name,e.target.value);
    
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  //   let i;
  // for (i = 0; i < cars.length; i++) {
  //   text += cars[i] + "<br>";
  // }


  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Add new transaction</h3>
        <form onSubmit={onSubmit}>
          {
            modalTransactions.map((val, idx) => {
              let trId = `tr-${idx}`, ageId = `age-${idx}`
              return (
                <div key={idx}>
                  <label htmlFor={trId}>{`Transacion #${idx + 1}`}</label>
                  <input
                    type="text"
                    name={idx}
                    data-id={idx}
                    id={trId}
                    className="name"
                    value={amounts[idx]}
                    onChange={handleChange}
                  />
                </div>
              )
            })
          }
          <button className="btn">Add transaction</button>
        </form>
      </Modal>
    </div>
  )
}

