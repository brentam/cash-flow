import React, { useContext, useState } from 'react'
import { Modal, Button,InputNumber} from 'antd';
import { TableModalContext } from '../context/TableModalState'
import { PeriodContext } from '../context/PeriodState'

export const MyModal = ({resultFunction}) => {

  const {splitCashFlowTransaction} = useContext(PeriodContext);
  const { modalState, resetModal ,handleChangeValues,createNewModalTransaction} = useContext(TableModalContext);
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


  const handleChange = (value,idx) => {
    // const inputId=e.target.name;
    // let arr = [...amounts] 
    // arr[inputId]=e.target.value;  
    // setAmount(arr);
    handleChangeValues(value,idx);
    
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
        <Button className="btn" onClick={()=>createNewModalTransaction(0)}>Add transaction</Button>
        <form onSubmit={onSubmit}>
          {
            modalTransactions.map((val, idx) => {
              let trId = `tr-${idx}`;
              return (
                // <div key={idx}>
                //   <label htmlFor={trId}>{`Transacion #${idx + 1} `}</label>
                //   <input
                //     type="text"
                //     name={idx}
                //     data-id={idx}
                //     id={trId}
                //     className="name"
                //     value={amounts[idx]}
                //     onChange={handleChange}
                //   />
                // </div>
                <div>
                   <label htmlFor={trId}>{`Transacion #${idx + 1} `}</label>
                <InputNumber id={trId}
                     value={amounts[idx]}
                     onChange={(value)=>handleChange(value,idx)}
                />

                </div>
              )
            })
          }
        </form>
      </Modal>
    </div>
  )
}

