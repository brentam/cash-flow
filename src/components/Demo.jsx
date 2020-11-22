import React, { useState,useContext } from 'react';
import 'antd/dist/antd.css';
import { Table, Radio, Divider } from 'antd';
import { PeriodContext } from '../context/PeriodState'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
]; // rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

export const Demo = () => {
    const { period } = useContext(PeriodContext);
    const data2 = period.bankSide;

        const columns2 = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        }, 
        {
            title: 'Value',
            dataIndex: 'value',
        }
        ,
    ];

  return (
    <div>

      <Table rowKey="id"
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns2}
        dataSource={data2}
      />
    </div>
  );
};
