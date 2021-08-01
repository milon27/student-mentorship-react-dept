import moment from 'moment'
import Define from './Define';
const Helper = {
    validateField: (...arr) => {
        const n_arr = arr.filter(itm => {
            if (itm && itm !== null && itm !== undefined) {
                return true
            }
        })
        if (n_arr.length === arr.length) {
            return true;//valid all field
        } else {
            return false;//invalid all field
        }
    },//validateField

    getCurrentDate: () => {
        return moment().format(
            Define.FORMAT_DATE
        )
    }
}

export default Helper