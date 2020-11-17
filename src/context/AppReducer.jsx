export default (state,action )=>{
    switch(action.type){
        case 'D_TRANSACTION': return  {//return all state plus modified actions
            ...state,
            transactions: state.transactions.filter(t=>t.id!==action.payload)
        }
        case 'A_TRANSACTION': return {...state,transactions:[...state.transactions,action.payload]}
        default: return state;
    }
}