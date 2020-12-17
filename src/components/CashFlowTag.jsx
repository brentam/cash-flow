import React, { useContext, useState } from 'react'
import { Table, Space } from 'antd';
import { PeriodContext } from '../context/PeriodState'
import { TableModalContext } from '../context/TableModalState'
import { MatchedContext } from '../context/MatchedState'
import { MyModal } from './MyModal'
import CashFlowSumary from './CashFlowSummary'
import 'antd/dist/antd.css';
import '../theApp.css';
import {getTableConfig } from '../modalConfig.js';

export const CashFlowTag = ({ type }) => {

    //   const { period, changePeriod } = useContext(PeriodContext);
    const { period } = useContext(PeriodContext);
    const { showModal } = useContext(TableModalContext);
    const { changeFocusPerValue, isValueInFocus, clearFocus } = useContext(MatchedContext);
    //for the table selected state
    const [rowState, setRowState] = useState({ selectedRowKeys: [] });

    const onSplit = (record) => {
        showModal({ type: type, visible: true, value: record.value, id: record.id });
    }


    const onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {
        onSelectionChange(selectedRowKeys);
    }


    const selectRowWhenClickOnCell = (record) => {
        const selectedRowKeys = rowState.selectedRowKeys.slice(0);
        const indexOfRow = selectedRowKeys.indexOf(record.id);
        if (indexOfRow >= 0) {
            selectedRowKeys.splice(indexOfRow, 1);

        } else {
            selectedRowKeys.push(record.id);
        }

        onSelectionChange(selectedRowKeys);
    }

    //load config for table rendering
    const { columns, dataSource,disableCondition } =getTableConfig( type,period, onSplit, selectRowWhenClickOnCell,isValueInFocus);

    function onSelectionChange(selectedRowKeys) {
        if (selectedRowKeys.length) {
            //todo find a better way to find the focus
            const value = dataSource.filter(element => element.id === selectedRowKeys[0])
            changeFocusPerValue(value[0].value);
        } else {
            //todo should clear focus only when both tables selections are empty-
            clearFocus();
        }

        setRowState({ ...rowState, selectedRowKeys })
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
        hideSelectAll: true,
        onChange: onSelectedRowKeysChange,
        getCheckboxProps: disableCondition,
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

