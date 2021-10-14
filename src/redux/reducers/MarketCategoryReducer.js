import * as types from '../type';

const initialState = {

    market_status: false,
    market_data: [],
    alertLogData: [],
    selectedSymbol: '',
    saveSymbol: false,
    saveSymbol1: false,
    homeSymbol: '',
    selectedNews: '',
    stocktwitsSym: '',
    selectedAlertsSym: '',
    open_modal: false,
    gainer_data: [],
    decliner_data: [],
    saveHomesym: false,
    strikeVal: ''
}


export default (state = initialState, action) => {



    switch (action.type) {
        case types.MARKET_STATUS:
            return {
                ...state,
                market_status: action.status,
            }
            break;
        case types.SELECTED_SYMBOL:
            return {
                ...state,
                selectedSymbol: action.payload,
            }
            break;
        case types.ISSELECTED_SYMBOL:
            return {
                ...state,
                saveSymbol: action.payload,
            }
            break;
        case types.STRIKE_VAL:
            return {
                ...state,
                strikeVal: action.payload,
            }
            break;
        case types.ISSELECTED_SYMBOL1:
            return {
                ...state,
                saveSymbol1: action.payload,
            }
            break;
        case types.SELECTED_NEWS_SYMBOL:
            return {
                ...state,
                selectedNews: action.payload,
            }
            break;
        case types.SELECTED_STOCKS_SYMBOL:
            return {
                ...state,
                stocktwitsSym: action.payload,
            }
            break;
        case types.SELECTED_ALERT_SYMBOL:
            return {
                ...state,
                selectedAlertsSym: action.payload,
            }
            break;
        case types.ISHSELECTED_SYMBOL:
            return {
                ...state,
                saveHomesym: action.payload,
            }
            break;
        case types.SELECTED_SYMBOL1:
            return {
                ...state,
                homeSymbol: action.payload,
            }
            break;
        case types.MARKET_DATA:
            return {
                ...state,
                market_data: [...action.payload],
            }
            break;
        case types.OPEN_SERACH_MODAL:
            return {
                ...state,
                open_modal: action.payload,
            }
            break;
        case types.TAB_ALERT_LOG:
            return {
                ...state,
                alertLogData: [...action.payload],
            }
            break;
        case types.SAVE_GAINER_DATA_ACTION:

            return {
                ...state,
                gainer_data: [...action.payload],
            }
            break;
        case types.SAVE_DECLINER_DATA_ACTION:
            return {
                ...state,
                decliner_data: [...action.payload],
            }
            break;

        default:
            return state;

    }
}
