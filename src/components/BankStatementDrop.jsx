import React, { useState, useContext } from 'react';
import Data from '../data/model.json';
import { PeriodContext } from '../context/PeriodState'
import { Select } from "antd";
import "antd/dist/antd.css";

export const BankStatementDrop = () => {
  const { Option } = Select;

  const [state, setState] = useState({ firstTime: true });

  const periodMap = new Map(Data.period.map(i => [i.dateId, i]));
  const dateIds = [...periodMap.keys()];




  const {changePeriod } = useContext(PeriodContext);

  function handleChange(value) {
    console.log(value)
  changePeriod(periodMap.get(value));

  };

  if (state.firstTime) {

    setState({ firstTime: false })
    handleChange(dateIds[0])
  }
  return (

    <>
      <label htmlFor="p1">Bank Statement Date </label>
      <Select defaultValue={dateIds[0]}
        onChange={handleChange}
      >
        {dateIds.map(t => <Option key ={t} value={t}>{t}</Option>)}
      </Select>
    </>
  )
}




