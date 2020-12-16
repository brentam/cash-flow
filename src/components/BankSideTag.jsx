import React, { useContext, useState } from 'react'
import { Modal, Table, Space, Alert } from 'antd';
import { PeriodContext } from '../context/PeriodState'
import { TableModalContext } from '../context/TableModalState'
import { MyModal } from './MyModal'
import CashFlowSumary from './CashFlowSummary'
import  Money  from './Money'
import 'antd/dist/antd.css';
import '../theApp.css';
import { getBankSideConfig } from '../modalConfig.js';

export const BankSideTag = () => {

    //   const { period, changePeriod } = useContext(PeriodContext);
    const { period } = useContext(PeriodContext);
    const { showModal } = useContext(TableModalContext);
    //for the table selected state
    const [rowState, setRowState] = useState({ selectedRowKeys: [], modalVisible: false });
    
    const onSplit = (record) => {
        showModal({ type:10,visible: true, value: record.value, id: record.id });
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

    const { columns, dataSource,type } = getBankSideConfig(period, onSplit, selectRow);


    const { selectedRowKeys } = rowState;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectedRowKeysChange,
    };

    return (
        <>
        <div className="zone">

        <CashFlowSumary totals={{totalCredit:+10, totalDebit:-2}}/>
                    <Table
                rowKey="id"
                dataSource={dataSource}
                columns={columns}
                //we will use the onCell to select click the rows.. because some
                //cells we dont want to trigger the selection (i.e. split)
                //   onRow={ (record)=>( {onClick: ()=>{selectRow(record);},})}

                rowSelection={rowSelection}

            />
            <MyModal type={type}/>
        </div>
        </>
    )
}


