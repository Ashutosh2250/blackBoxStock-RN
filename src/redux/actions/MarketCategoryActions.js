import images from '../../res/images/images';
import API_URL from '../../utils/ApiUrl';
import AppSingleton from '../../utils/AppSingleton';
import * as types from '../type';


export const checkMarketStatus = (url, node) => dispatch => {
    // without return any promise
    dispatch(AppSingleton.getInstance().apiAction({
        hubUrl: API_URL.base_url + url,
        hubNode: node,
        onSuccess: (response) => {
            dispatch({
                type: types.MARKET_STATUS,
                status: response
            })
        },
        onFailure: (error) => {
            console.log(error);
        },
        label: types.MARKET_STATUS
    }))
}

export const saveSelectedSymbol = (symbol) => {
    return {
        type: types.SELECTED_SYMBOL,
        payload: symbol
    }
}
export const saveStrikeVal = (strikeVal) => {
    return {
        type: types.STRIKE_VAL,
        payload: strikeVal
    }
}
export const saveOptionSymbol = (Opsymbol) => {
    return {
        type: types.ISSELECTED_SYMBOL,
        payload: Opsymbol
    }
}
export const saveOptionSymbol1 = (Opsymbol1) => {
    return {
        type: types.ISSELECTED_SYMBOL1,
        payload: Opsymbol1
    }
}

export const saveHomeSymbol = (Homesymbol) => {
    return {
        type: types.ISHSELECTED_SYMBOL,
        payload: Homesymbol
    }
}
export const saveSelectedSymbol1 = (symbol1) => {

    return {
        type: types.SELECTED_SYMBOL1,
        payload: symbol1
    }
}
export const saveNewsSymbol = (symbol2) => {

    return {
        type: types.SELECTED_NEWS_SYMBOL,
        payload: symbol2
    }
}
export const saveStocksSymbol = (symbol3) => {

    return {
        type: types.SELECTED_STOCKS_SYMBOL,
        payload: symbol3
    }
}
export const saveAlertSymbol = (symbol4) => {

    return {
        type: types.SELECTED_ALERT_SYMBOL,
        payload: symbol4
    }
}
export const openModal = (isClose) => {
    return {
        type: types.OPEN_SERACH_MODAL,
        payload: isClose
    }
}
export const saveGainerData = (data) => {

    return {
        type: types.SAVE_GAINER_DATA_ACTION,
        payload: data
    }
}
export const saveDeclinerData = (data) => {
    return {
        type: types.SAVE_DECLINER_DATA_ACTION,
        payload: data
    }
}

const processDataForEachTab = (tabname, response) => {

    let tabNo = 0;
    let mainArray = [];
    let upDownIndicator;
    let redArrow = images.redDown;
    let greenArrow = images.greenUp

    switch (tabname) {
        case types.TAB_MARKET_SCAN:
        case types.TAB_POST_MARKET_SCAN:
        case types.TAB_PRE_MARKET_SCAN: {
            response.forEach((item, index) => {

                if (item.CurrentPrice < item.ClosePrice) {
                    upDownIndicator = redArrow;
                } else if (item.CurrentPrice > item.ClosePrice) {
                    upDownIndicator = greenArrow
                }
                let obj = {
                    'column1': item.Symbol,
                    'column2': upDownIndicator,
                    'column3': item.CurrentPrice ? "$" + item.CurrentPrice.toFixed(2) : '',
                    'column4': item.CurrentVolume ? item.CurrentVolume : '',
                    'column5': item.PercentChange ? item.PercentChange.toFixed(2) + "%" : '',
                };
                //  
                mainArray.push(obj);
                tabNo = 1;
            });
        }
            break;
        case types.TAB_VOLUME_RATIO: {
            response.forEach((item, index) => {

                if (item.CurrentPrice < item.ClosePrice) {
                    upDownIndicator = redArrow;
                } else if (item.CurrentPrice > item.ClosePrice) {
                    upDownIndicator = greenArrow
                }
                let obj = {
                    'column1': item.Symbol,
                    'column2': upDownIndicator,
                    'column3': item.CurrentPrice ? "$" + item.CurrentPrice.toFixed(2) : '',
                    'column4': item.CurrentVolume ? item.CurrentVolume : '',
                    'column5': item.Ratio ? item.Ratio + "%" : '',
                };
                //  
                mainArray.push(obj);
                tabNo = 2;
            });
        }
            break;
        case types.TAB_ALERT_LOG: {
            response.forEach((item, index) => {

                if (item.Price > item.CurrentPrice) {
                    upDownIndicator = redArrow;
                } else if (item.Price < item.CurrentPrice) {
                    upDownIndicator = greenArrow
                }
                let obj = {
                    'column1': item.Symbol,
                    'column2': upDownIndicator,
                    'column3': item.Price ? "$" + item.Price.toFixed(2) : '',
                    'column4': item.CurrentVolume ? item.CurrentVolume : '',
                    'column5': 'hello',
                };
                //  
                mainArray.push(obj);
                tabNo = 3;
            });
        }
            break;
        case types.TAB_ALERT_STREAM: {
            response.forEach((v, index) => {
                console.log("alert", tabname, v);

                let obj = {
                    'column1': "Today",
                    'column2': v.Symbol,
                    'column3': v.Message,
                    'column4': v.Message2,
                    'column5': v.CurrentPrice ? "$" + v.CurrentPrice.toFixed(2) : '',
                    'color': v.MessageType
                };
                //  
                mainArray.push(obj);
                tabNo = 4;
            });
        }
            break;
        default:


    }
    return {
        mainArray: mainArray,
        tab: tabNo,
    };
}


export const getMarketData = (url, node, tabname, oldUrl, oldNode) => dispatch => {

    dispatch({
        type: types.MARKET_DATA,
        payload: []
    })
    dispatch(AppSingleton.getInstance().apiAction({
        oldUrl: oldUrl,
        oldNode: oldNode,
        hubUrl: url,
        hubNode: node,
        onSuccess: (response) => {
            let { mainArray, tab } = processDataForEachTab(tabname, response)

            dispatch({
                type: types.MARKET_DATA,
                payload: mainArray
            })
        },
        onFailure: (error) => {
            console.log(error);
        },
        label: types.MARKET_DATA
    }))


}


export const emptyMarketData = () => {
    return {
        type: types.MARKET_DATA,
        payload: []
    }
}