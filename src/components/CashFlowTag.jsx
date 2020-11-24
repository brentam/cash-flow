import React, { useContext, useState } from 'react'
import 'antd/dist/antd.css';
import { Modal, Table, Space, Alert } from 'antd';
import { PeriodContext } from '../context/PeriodState'
import { TableModalContext } from '../context/TableModalState'
import { MyModal } from './MyModal'

export const CashFlowTag = () => {
    //   const { period, changePeriod } = useContext(PeriodContext);
    const { period, splitBankSideTransaction } = useContext(PeriodContext);
    const { modalState, showModal } = useContext(TableModalContext);

    //for the table selected state
    const [rowState, setRowState] = useState({ selectedRowKeys: [], modalVisible: false });

    const dataSource1 = period.transactionSide;
    const maxIndex = dataSource1.length ? (dataSource1.reduce((prev, current) => { return (prev.id > current.id) ? prev : current }).id) : 0;

    const onCellConfig = (record) => {
        return ({ onClick: () => { selectRow(record) } })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'BKType',
            dataIndex: 'bkType',
            onCell: onCellConfig
        },
        {
            title: 'Value',
            dataIndex: 'value',
            onCell: onCellConfig
        }
        ,
        {
            title: 'CF Type',
            dataIndex: 'tType',
            onCell: onCellConfig
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => onSplit(record)} >Split </a>
                    {/* <a onClick={()=>onSplit(record)} >Split {record.value}</a> */}
                </Space>
            ),
        },
    ];





    const onSplit = (record) => {
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

    const resultFunction=(arr)=>{
        alert(arr.length);
    }

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
            <MyModal resultFunction={resultFunction}/>
        </>
    )
}

