import React, { useContext, useState } from 'react'
import { Modal, Table, Space, Alert } from 'antd';
import { PeriodContext } from '../context/PeriodState'
import { TableModalContext } from '../context/TableModalState'
import { MyModal } from './MyModal'
import  Money  from './Money'
import '../theApp.css';
import 'antd/dist/antd.css';

export const BankSideTag = () => {
    //   const { period, changePeriod } = useContext(PeriodContext);
    const { period, splitBankSideTransaction } = useContext(PeriodContext);
    const { modalState, showModal } = useContext(TableModalContext);

    //for the table selected state
    const [rowState, setRowState] = useState({ selectedRowKeys: [], modalVisible: false });

    const dataSource1 = period.bankSide;
    const maxIndex = dataSource1.length ? (dataSource1.reduce((prev, current) => { return (prev.id > current.id) ? prev : current }).id) : 0;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        }, {
            title: 'Value',
            dataIndex: 'value',
            render(text, record) {
                return {
                    // props: {
                    //     style: { background: parseInt(text) < 0 ? "red" : "green" }
                    // },
                    children: <Money value={text}/>
                };
            },

            onCell: (record) => ({ onClick: () => { selectRow(record); } }),

        }
        ,
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => onSplit(record)} >Split {record.value}</a>
                    {/* <a onClick={()=>onSplit(record)} >Split {record.value}</a> */}
                </Space>
            ),
        },
    ];





    const onSplit = (record) => {
        //TODO add modal screen to capture values
        //for now just split in the middle

        /*
        const value=record.value;
        const val1= (value/2).toFixed(2);
        const val2= value -(val1);
        splitBankSideTransaction({originalId:record.id,newTransactions:[ {
          "id": maxIndex+1,
          "value": val1,
          "type": record.type
        }, {
          "id": maxIndex+2,
          "value": val2,
          "type": record.type
        }]})
        */

        showModal({ visible: true, value: record.value });
    }

    const onSelectedRowKeysChange = (selectedRowKeys) => {
        setRowState({ ...rowState, selectedRowKeys })
    }


    const selectRow = (record) => {
        const selectedRowKeys = rowState.selectedRowKeys.slice(0);
        const indexOfRow = selectedRowKeys.indexOf(record.id);
        if (indexOfRow >= 0) {
            selectedRowKeys.splice(indexOfRow, 1);

        } else {
            selectedRowKeys.push(record.id);
        }

        setRowState({ ...rowState, selectedRowKeys })
    }



    const { selectedRowKeys } = rowState;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectedRowKeysChange,
    };


    return (
        <>
            <Table
                rowKey="id"
                dataSource={dataSource1}
                columns={columns}
                //we will use the onCell to select click the rows.. because some
                //cells we dont want to trigger the selection (i.e. split)
                //   onRow={ (record)=>( {onClick: ()=>{selectRow(record);},})}

                rowSelection={rowSelection}

            />
            <MyModal />
        </>
    )
}

