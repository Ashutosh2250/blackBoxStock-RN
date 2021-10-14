import * as types from '../type';
import ApiFetch from "../../utils/ApiFetch"

export const userLogin = (staus) => {
    return {
        type: types.LOGIN_USER,
        payload: staus
    }

}

export const notifications_Tags = (tags) => {
    return {
        type: types.NOTIFICATION_TAGS,
        payload: tags
    }
}

export const hitLoginActionApi = (url, prompt) =>
    (dispatch) => {
        return ApiFetch.fetchPost(url, JSON.stringify(prompt))
            .then((response) => {
                console.log(response, "hitLoginActionApi");
                return response
            }).catch((err) => {
                console.log("errror hitLoginActionApi Action", err)
            })
    };



export const hitGetProfileActionApi = (url, dataObj) =>

    (dispatch) => {
        return ApiFetch.fetchPost(url, JSON.stringify(dataObj))
            .then((response) => {
                console.log(response, "hitLoginActionApi");
                return response
            }).catch((err) => {
                console.log("errror hitLoginActionApi Action", err)
            })
    };
export const hitUpdateProfileActionApi = (url, dataObj) =>

    (dispatch) => {
        console.log(dataObj, "dataObj");
        return ApiFetch.fetchPost(url, JSON.stringify(dataObj))
            .then((response) => {
                console.log(response, "hitLoginActionApi");
                return response
            }).catch((err) => {
                console.log("errror hitLoginActionApi Action", err)
            })
    };