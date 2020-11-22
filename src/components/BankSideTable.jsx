import React, { useContext, useState } from 'react'
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { PeriodContext } from '../context/PeriodState'

export const BankSideTable = () => {
    //   const { period, changePeriod } = useContext(PeriodContext);
    const { period, changePeriod } = useContext(PeriodContext);
    const dataSource1 = period.bankSide;

    const dataSource = [
        {
            id: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            id: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

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
        }
        ,
    ];



    const [rowState, setRowState] = useState({ selectedRowKeys: [] });


    const onSelectedRowKeysChange = (selectedRowKeys) => {
        setRowState({ selectedRowKeys })
    }


    const selectRow = (record) => {
        const selectedRowKeys = rowState.selectedRowKeys.slice(0);
        const indexOfRow = selectedRowKeys.indexOf(record.key);
        if (indexOfRow >= 0) {
            selectedRowKeys.splice(indexOfRow, 1);

        } else {
            selectedRowKeys.push(record.key);
        }

        setRowState({ selectedRowKeys: selectedRowKeys })
    }



    const { selectedRowKeys } = rowState;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectedRowKeysChange,
    };


    const rowSelection2 = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };
      
    return (
        <Table 
        rowKey="id"
            dataSource={dataSource1}
            columns={columns}
            //    onRow={ (record)=>(
            //       {onClick: ()=>{selectRow(record);},})}

            rowSelection={rowSelection2}

        />
    )
}

