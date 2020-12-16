import React, { useContext, useState } from 'react'
import { Table } from 'antd';
import { PeriodContext} from '../context/PeriodState'
import {CASH_FLOW_SIDE,BANK_SIDE} from '../consts.js'
import { TableModalContext } from '../context/TableModalState'
import { MatchedContext } from '../context/MatchedState'
import { MyModal } from './MyModal'
import CashFlowSumary from './CashFlowSummary'
import Money from './Money'
import 'antd/dist/antd.css';
import '../theApp.css';
import { getBankSideConfig, getCashFlowSideConfig } from '../modalConfig.js';

export const CashFlowTag = ({ type }) => {

    const onCellConfig = (record) => {
        return ({ onClick: () => { selectRow(record) } })
    }
    const valueStyle = (text, record) => {
        return {
            // props: {
            //     style: { color: parseInt(text) < 0 ? "red" : "green" }
            // },
            // children: <div >{text}</div>
            children: <Money value={text} />
        };

    }


    //   const { period, changePeriod } = useContext(PeriodContext);
    const { period } = useContext(PeriodContext);
    const { showModal } = useContext(TableModalContext);
    const {changeFocusPerValue,isValueInFocus,clearFocus}=useContext(MatchedContext);
    //for the table selected state
    const [rowState, setRowState] = useState({ selectedRowKeys: [] });

    const onSplit = (record) => {
        showModal({ type: type, visible: true, value: record.value, id: record.id });
    }


    const onSelectedRowKeysChange = (selectedRowKeys) => {
        onSelectionChange(selectedRowKeys);
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
        onSelectionChange(selectedRowKeys);
    }

    //load config for table rendering
    const { columns, dataSource } = (type === CASH_FLOW_SIDE ?
        getCashFlowSideConfig(period, onSplit, selectRow) :
        getBankSideConfig(period, onSplit, selectRow)
    );

    function onSelectionChange(selectedRowKeys){
        setRowState({ ...rowState, selectedRowKeys })
        if(selectedRowKeys.length){
            const value= dataSource.filter(element => element.id===selectedRowKeys[0].id)
            changeFocusPerValue(value.value);
        }else{
            clearFocus();
        }

    }



    const initialValue = { totalCredit: +0, totalDebit: +0 }
    const accumulated = dataSource.length ?
        dataSource.reduce(
            (accumulator, current) => {
                if (current.value >= 0) {
                    accumulator.totalCredit += current.value;
                } else {

                    accumulator.totalDebit += current.value;
                }
                return accumulator;

            }, initialValue) : initialValue;

    const { selectedRowKeys } = rowState;
    const rowSelection = {
       selectedRowKeys,
        onChange: onSelectedRowKeysChange,
        getCheckboxProps: (record) => ({
            disabled: !isValueInFocus(record.value),
            // Column configuration not to be checked
            id: record.id,
        }),
    };
    // alert(maxIndex.c);
    return (
        <>
            <div className="zone">

                <CashFlowSumary totals={accumulated} />
                <Table
                    rowKey="id"
                    dataSource={dataSource}
                    columns={columns}
                    //we will use the onCell to select click the rows.. because some
                    //cells we dont want to trigger the selection (i.e. split)
                    //   onRow={ (record)=>( {onClick: ()=>{selectRow(record);},})}

                    rowSelection={rowSelection}

                />
                <MyModal />
            </div>
        </>
    )
}

