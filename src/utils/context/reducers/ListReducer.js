import Types from '../actions/Types';
export const initListState = [];

const ListReducer = (state, action) => {
    switch (action.type) {
        case Types.GET_DATA:
            return [...action.payload]; //return an array
        case Types.ADD_DATA:
            return [action.payload, ...state]; //return array with new object
        case Types.UPDATE_DATA:
            //use case
            /**
             * this.dispatch({
             *      type:Types.UPDATE_DATA
             *      payload:{
             *          id_field:"id",
             *          obj:{}
             *      }
             * })
             */
            console.log(action.payload.id_field, action.payload.obj);
            return state.map(itm => {
                const id_field = action.payload.id_field
                if (itm[id_field] === action.payload.obj[id_field])
                    return action.payload.obj;
                else
                    return itm;
            });//return array with updated object

        // return state.filter((updateData) => {
        //     return updateData[action.payload.id_field] === action.payload.id
        // });
        case Types.DELETE_DATA:
            /**
             * this.dispatch({
             *      type:Types.DELETE_DATA
             *      payload:{
             *          id_field:"id",
             *          id:2
             *      }
             * })
             */

            return state.filter((Deletedata) => {
                return Deletedata[action.payload.id_field] === action.payload.id
            });
        default:
            return state; //default arry
    }

}
export default ListReducer;