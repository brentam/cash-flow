import Money from './components/Money'
import { Modal, Table, Space, Alert } from 'antd';


const valueStyle = (text, record) => {
    return {
        // props: {
        //     style: { color: parseInt(text) < 0 ? "red" : "green" }
        // },
        // children: <div >{text}</div>
        children: <Money value={text} />
    };

}


export function getCashFlowSideConfig(period, renderSplitFunction, selectRowFunction) {

    const onCellConfig = (record) => {
        return ({ onClick: () => { selectRowFunction(record) } })
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
            render: renderSplitFunction,
        },
    ];


    return { columns: columns, dataSource: period.transactionSide };
}

export function getBankSideConfig(period,renderSplitFunction, selectRowFunction) {

    const onCellConfig = (record) => {
        return ({ onClick: () => { selectRowFunction(record) } })
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
            render:renderSplitFunction,
        },
    ];


    return { columns: columns, dataSource: period.bankSide };
}