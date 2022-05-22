import {
 ALERT_SUCCESS,
 ALERT_FAIL
} from '../types'

export default (state , action) => {
    switch(action.type) {
        case ALERT_SUCCESS:
            return {
                ...state,
                alert: [...state.alert , action.payload]
            }
        
        case ALERT_FAIL: 
            return {
                ...state,
                alert: state.alert.filter(item => item.id !== action.payload)
        }

        default:
            return
    }
}