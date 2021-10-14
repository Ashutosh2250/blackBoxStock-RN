

import * as types from '../redux/type'
/**
 * this class is used to set the app singleton class 
 */

class AppSingleton {


    static appInstance = null;
    a = 5

    /**
   * @returns {AppSingleton}
   */

    static getInstance() {
        if (AppSingleton.appInstance == null) {
            AppSingleton.appInstance = new AppSingleton();

        }

        return AppSingleton.appInstance;
    }
    email = "";
    apiAction = ({
        oldUrl,
        oldNode,
        hubUrl,
        hubNode,
        onSuccess = () => { },
        onFailure = () => { },
        label,
    }) => {
        return {
            type: types.API,
            payload: {
                oldUrl,
                oldNode,
                hubUrl,
                hubNode,
                onSuccess,
                onFailure,
                label
            }
        }
    }
}

export default AppSingleton;