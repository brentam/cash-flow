import React, { useContext, useState } from 'react'
import { Modal, Table, Space, Alert } from 'antd';
import { PeriodContext } from '../context/PeriodState'
import { TableModalContext } from '../context/TableModalState'
import { MyModal } from './MyModal'
import CashFlowSumary from './CashFlowSummary'
import  Money  from './Money'
import 'antd/dist/antd.css';
import '../theApp.css';

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
    const valueStyle = (text, record) => {
        return {
            // props: {
            //     style: { color: parseInt(text) < 0 ? "red" : "green" }
            // },
            // children: <div >{text}</div>
            //  children: <div className={parseInt(text) < 0 ? "red" : "green"} >{text}</div>
                    children: <Money value={text}/>
        };

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
            render: valueStyle,
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
        showModal({ visible: true, value: record.value, id: record.id });
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

    const resultFunction = (arr) => {
        let i;
        for (i = 0; i < arr.length; i++) {
            // alert(arr[i]);
        }
    }

    return (
        <>
        <div className="zone">

        <CashFlowSumary totals={{totalCredit:+10, totalDebit:-2}}/>
                    <Table
                rowKey="id"
                dataSource={dataSource1}
                columns={columns}
                //we will use the onCell to select click the rows.. because some
                //cells we dont want to trigger the selection (i.e. split)
                //   onRow={ (record)=>( {onClick: ()=>{selectRow(record);},})}

                rowSelection={rowSelection}

            />
            <MyModal resultFunction={resultFunction} />
        </div>
        </>
    )
}

