import React, { useEffect,useContext } from 'react';
import Data from '../data/model.json';
import { PeriodContext } from '../context/PeriodState'
import { Select } from "antd";
import "antd/dist/antd.css";

export const BankStatementDrop = () => {
  const { Option } = Select;

  const periodMap = new Map(Data.period.map(i => [i.dateId, i]));
  const dateIds = [...periodMap.keys()];




  const {period,changePeriod } = useContext(PeriodContext);

  function handleChange(value) {
    console.log(value)
  changePeriod(periodMap.get(value));

  };

  useEffect(() => {
    //TODO find a better way to initialize the period
    if(!period.bankSide.length){
       handleChange(dateIds[0])
    }
})

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




