import Money from './components/Money'
import { Modal, Table, Space, Alert, Typography } from 'antd';
import { CASH_FLOW_SIDE, BANK_SIDE } from './consts.js'



// function renderSplit(record) {
//     if (!isValueInFocus(record.value)) {
//         return (
//             <Space size="middle"></Space>)
//     }
//     return (
//         <Space size="middle">
//             <a onClick={() => onSplit(record)} >Split </a>
//         </Space>
//     )
// }
const valueStyle = (value) => {
    return {
        // props: {
        //     style: { color: parseInt(text) < 0 ? "red" : "green" }
        // },
        // children: <div >{text}</div>
        children: <Money value={value} />
    };

}


export function getTableConfig(type, period, splitFunction, selectRowFunction, lineEnablerFunction) {

    // will conidtionaly enable row selection by click on any cell with this config

    const onCellConfig = (record) => {

        if (!lineEnablerFunction(record.value)) {
            return ({});
        } else {
            return ({ onClick: () => { selectRowFunction(record) } })
        }
    }

    //will conditionaly render the split 'link'
    const renderSplit = (record) => {
        let test = lineEnablerFunction(record.value);
        if (!test) {
            return (<Space size="middle"></Space>)
        }
        return (
            <Space size="middle">
                <a onClick={() => splitFunction(record)} >Split </a>
            </Space>
        )
    }

    //function for the table to know if row is disable , will return in this config
    const disableCondition = (record) => ({
        disabled: !lineEnablerFunction(record.value),
        // Column configuration not to be checked
        id: record.id,
    })


    let columns;
    let dataSource;
    switch (type) {
        case CASH_FLOW_SIDE: {

            dataSource = period.transactionSide;
            columns = [
                   {
                    title: 'TAG',
                    dataIndex: 'tagged',
                },
                {
                    title: 'ID',
                    dataIndex: 'id',
                    onCell: onCellConfig
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
                    render: renderSplit,
                },
            ];
            break;
        }
        case BANK_SIDE: {
            dataSource = period.bankSide;
            columns = [
                 {
                    title: 'TAG',
                    dataIndex: 'tagged',
                },
                {
                    title: 'ID',
                    dataIndex: 'id',
                    onCell: onCellConfig
                },
                
                {
                    title: 'Type',
                    dataIndex: 'type',
                    onCell: onCellConfig
                }, {
                    title: 'Value',
                    dataIndex: 'value',
                    render: valueStyle,
                    onCell: onCellConfig

                }
                ,
                {
                    title: 'Action',
                    key: 'action',
                    render: renderSplit,
                },
            ];
            break;

        }

        default:
            throw "no configuration found for table " + type;

    }
    return { columns: columns, dataSource: dataSource, disableCondition: disableCondition };

}






