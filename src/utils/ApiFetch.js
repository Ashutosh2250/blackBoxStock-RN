
import { getHeader } from '../utils/Utils'
import axios from "axios";

const ApiFetch = {
    /// For Api get use this
    fetchGet: function (url) {
        let headers = getHeader();
        console.log('url ==>>', url, 'headers=>>>', headers);
        return fetch(url, {
            method: 'GET',
            headers: headers,
        })
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {
                console.log('error=>>>', error);
            });
    },

    // for Api Post use this
    fetchPost: function (url, body) {
        let headers = getHeader();
        console.log('url ==>>', url, ' body==', body, 'headers=>>>', headers);
        return fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
        })
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {
                console.log('Error', error);
            });
    },

    axiosGetAPI: function (url) {
        let headers = getHeader();
        console.log('url ==>>', url, 'headers=>>>', headers);
        axios.request({
            url,
            method,
            headers: headers,
            [dataOrParams]: data,
            timeout: 60000,
        })
            .then(({ data }) => {
                console.log("ApiMiddleware Data", data)
                if (data.data != null) {
                    let action = onSuccess(data.data);
                    if (action) {
                        dispatch(action);
                    }
                } else {
                    this.handleFailure(data);
                }
            })
            .catch((error) => {
                console.log(`error `, error);

                //ERROR Handling
                if (error.response) {
                    console.log(`error.response.data: `, error.response.data);
                    console.log(`error.response.status: `, error.response.status);
                    console.log(`error.response.headers: `, error.response.headers);

                    handleFailure(error.response.data);
                } else if (error.request) {
                    console.log(`error.request: `, error.request._response);
                    handleFailure({
                        error: {
                            msg: error.request._response,
                            message: error.request._response,
                        },
                    });
                    return;
                }

                handleFailure(error.response.data);
                let action = onFailure(error.response.data.error);
                if (action) {
                    dispatch(action);
                }
            })
            .finally(() => {
                console.log("Finally");
            });
    }

};
export default ApiFetch