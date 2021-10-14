

import * as types from '../redux/type'
/**
 * this class is used to set the app singleton class 
 */
const signalR = require("@aspnet/signalr");
class SignalRSingleton {

    static appInstance = null;

    /**
   * @returns {SignalRSingleton}
   */
    constructor() {
        console.log("constructor ", new Date());
        this.connectionCache = {};
    }

    async connectSignlaR(hubUrl, hubNode, callback) {

        let key = `${hubUrl}_${hubNode}`;
        if (this.connectionCache[key] == null) {

            let connection = new signalR.HubConnectionBuilder()
                .withUrl(hubUrl)
                .build();

            try {
                await connection.start({ withCredentials: true });
                this.connectionCache[key] = connection;
                connection.on(hubNode, (response) => {
                    callback(response)
                })

            } catch (error) {
                return null;
            }

        }
        return this.connectionCache[key]
    }



    async stopSignalRConnection(hubUrl, hubNode) {

        return new Promise((resolve, reject) => {

            try {
                let key = `${hubUrl}_${hubNode}`;
                if (this.connectionCache[key]) {
                    this.connectionCache[key].stop()
                        .then(() => {
                            resolve('stopped')
                        })
                        .catch(error => {
                            reject(error)
                        })
                } else {
                    resolve('already stopped')
                }
            } catch (error) {
                console.log("jdhh");
                reject(error)
            }


        })

    }


}

const singleton = new SignalRSingleton();
global.singleton = singleton;
export default singleton;