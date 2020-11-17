import React,{useContext} from 'react';
import Data from '../data/model.json';
import { Select } from "antd";
import "antd/dist/antd.css";

export const BankStatementDrop = () => {
    const { Option } = Select;
      const dateIds= Data.data.period.map(items => items.dateId);
  return (

    <>
        <label for="p1">Bank Statement Date </label>
   <Select defaultValue={dateIds[0]}>
  { dateIds.map( t =>  <Option value={t}>{t}</Option>)}
</Select>
    </>
  )
}




