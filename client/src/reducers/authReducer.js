const INITIAL_STATE = {
    email:"",
    password:""
};

//Action Handler 
export default (state = INITIAL_STATE, action) => {
 switch (action.type) {
     case 'authUpdate':
         return {...state, [action.payload.field]: action.payload.value}
         break;
 
     default:
         return state;
 }
};