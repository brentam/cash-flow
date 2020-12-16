import React, { useContext, useState } from 'react'
import { Modal, Button, InputNumber, Alert } from 'antd';
import { TableModalContext } from '../context/TableModalState'
import { PeriodContext } from '../context/PeriodState'
import '../theApp.css';

export const MyModal = ({ resultFunction }) => {

  const  splitCashFlowTransaction  = useContext(PeriodContext)["splitCashFlowTransaction"];
  const { modalState, resetModal, handleChangeValues, createNewModalTransaction,deleteModal} = useContext(TableModalContext);
  const { visible, value, modalTransactions } = modalState;
  // const [amounts, setAmount] = useState([modalState.value]);
  const amounts = modalTransactions;

  // const showModal = () => {
  // //   this.setState({
  // //     visible: true,
  // //   });
  // };

  const handleOk = e => {
    console.log(e);
    splitCashFlowTransaction(modalState.id, modalTransactions);
    resultFunction(amounts);
    resetModal();
    //   this.setState({
    //     visible: false,
    //   });
  };

  const handleCancel = e => {
    console.log(e);
    resetModal();
    //   this.setState({~
    //     visible: false,
    //   });
  };


  const handleChange = (value, idx) => {
    // const inputId=e.target.name;
    // let arr = [...amounts] 
    // arr[inputId]=e.target.value;  
    // setAmount(arr);
    handleChangeValues(value, idx);

  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  //   let i;
  // for (i = 0; i < cars.length; i++) {
  //   text += cars[i] + "<br>";
  // }

  const total = modalTransactions.reduce((a, b) => a + b, 0);

  function Message(props) {
    if (props.size < 2) {
      return <Alert message="Split operation needs minimum of 2 transactins!" type="error" />
    }
    if (props.value == props.total) {
      return <Alert message="Click Split to confirm" type="success" />
    } else {
      return <Alert message={`Total of split transactions should total to: ` + props.value} type="error" />
    }
  }

  const transactionSize = modalTransactions ? modalTransactions.length : 0;
  return (
    <div >
      <Modal
        title={`Split ` + value}
        visible={visible}
        // onOk={handleOk}
         onCancel={handleCancel}

        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
            </Button>,
          <Button key="ok" disabled={(value != total ) || transactionSize<2} type="primary" onClick={handleOk}>
            Split
            </Button>,
        ]}
      >
        <Message value={value} total={total} size={transactionSize} />
        <Button className="btn" onClick={() => createNewModalTransaction(0)}>
          <h3>Add new transaction</h3>
        </Button>
        <form onSubmit={onSubmit}>
          {
            modalTransactions.map((val, idx) => {
              let trId = `tr-${idx}`;
              return (
                <div key={idx}>
                  <label htmlFor={trId}>{`Transacion #${idx + 1} `}</label>
                  <span>

                    <InputNumber id={trId}
                      value={amounts[idx]}
                      onChange={(value) => handleChange(value, idx)}
                    />
                    <button className="delete-btn" onClick={()=>deleteModal(idx)}
                    >x</button>
                  </span>
                </div>
              )
            })
          }
        </form>
      </Modal>
    </div>
  )
}

