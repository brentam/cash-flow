import React from 'react'

function Money(props) {

  const value=parseInt(props.value);
  const classN=value>=0?"green":"red";  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

  return (
    <div className={classN}>  
      {formatter.format(value)}
    </div>
  )
}


export default Money

