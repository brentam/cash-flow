import React, { useContext } from 'react'
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
            key: 'id',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        }
        ,
    ];


    return (
        <Table dataSource={dataSource1} columns={columns} />
    )
}

