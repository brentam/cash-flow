import Money from './components/Money'
import { Modal, Table, Space, Alert } from 'antd';





export function getCashFlowSideConfig(period, splitFuntion, selectRowFunction) {

    const onCellConfig = (record) => {
        return ({ onClick: () => { selectRowFunction(record) } })
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
                    <a onClick={() => splitFuntion(record)} >Split </a>
                </Space>
            ),
        },
    ];


    return { columns: columns, dataSource: period.transactionSide };
}

export function getBankSideConfig(period, splitFuntion, selectRowFunction) {

    const onCellConfig = (record) => {
        return ({ onClick: () => { selectRowFunction(record) } })
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



    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            onCell: onCellConfig
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

            onCell: (record) => ({ onClick: () => { selectRowFunction(record); } }),

        }
        ,
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => splitFuntion(record)} >Split </a>
                    {/* <a onClick={()=>onSplit(record)} >Split {record.value}</a> */}
                </Space>
            ),
        },
    ];


    return { columns: columns, dataSource: period.bankSide };
}