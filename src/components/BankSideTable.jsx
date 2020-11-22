import React, { useContext, useState } from 'react'
import 'antd/dist/antd.css';
import { Table,Space } from 'antd';
import { PeriodContext } from '../context/PeriodState'

export const BankSideTable = () => {
    //   const { period, changePeriod } = useContext(PeriodContext);
    const { period, changePeriod } = useContext(PeriodContext);
    const dataSource1 = period.bankSide;

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
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
            <a>Split {record.value}</a>
              </Space>
            ),
          },
    ];



    const [rowState, setRowState] = useState({ selectedRowKeys: [] });


    const onSelectedRowKeysChange = (selectedRowKeys) => {
        setRowState({ selectedRowKeys })
    }


    const selectRow = (record) => {
        const selectedRowKeys = rowState.selectedRowKeys.slice(0);
        const indexOfRow = selectedRowKeys.indexOf(record.id);
        if (indexOfRow >= 0) {
            selectedRowKeys.splice(indexOfRow, 1);

        } else {
            selectedRowKeys.push(record.id);
        }

        setRowState({ selectedRowKeys })
    }



    const { selectedRowKeys } = rowState;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectedRowKeysChange,
    };

      
    return (
        <Table 
        rowKey="id"
            dataSource={dataSource1}
            columns={columns}
                 onRow={ (record)=>( {onClick: ()=>{selectRow(record);},})}

            rowSelection={rowSelection}

        />
    )
}

