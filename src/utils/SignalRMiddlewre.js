import * as types from '../redux/type';
import singleton from './SignalRSingleton';
import signalRSingleton from './SignalRSingleton';
const signalR = require("@aspnet/signalr");


const startSignalRConnection = connection => connection.start({ withCredentials: true })
  .then(() => console.info('SignalR Connected'))
  .catch(err => console.error('SignalR Connection Error: ', err));


const apiMiddleware = ({ dispatch }) => next => async(action) => {
    next(action);
  
   
     if (action.type !==  types.API) return;
  
    const {
        oldUrl,
        oldNode,
      hubUrl,
      hubNode,
      onSuccess,
      onFailure,
      label,
     
    } = action.payload;
  
    try{

        const callback = (res) => {

           // console.log("resp",res);
            let action = onSuccess(res);
           if (action) {
                dispatch(action);
            }
        }

        console.log(oldUrl,oldNode,"mid");
        await signalRSingleton.connectSignlaR(hubUrl,hubNode,callback);
        // signalRSingleton.stopSignalRConnection(oldUrl,oldNode)
        // .then(async (result)=>{
        //   console.log("my con stop result",result);
        //   await signalRSingleton.connectSignlaR(hubUrl,hubNode,callback);

        // })
        // .catch(err => {
        //   console.log("my con err",err)
        // })
        
       
        
        // const connection = new signalR.HubConnectionBuilder()
        // .withUrl(hubUrl)
        // .build();
    
        // // event handlers, you can use these to dispatch actions to update your Redux store
        // connection.on(hubNode, (response)=>{
        //    let action = onSuccess(response);
        //    if (action) {
        //         dispatch(action);
        //     }
    
        // });
       
    
        // // re-establish the connection if connection dropped
        // connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));
    
        // if(connection !== null){
        //     connection.stop();
        //     console.log("on stop")
        //     setTimeout(() => {
        //         startSignalRConnection(connection);
        //         console.log("start after 2 secnds")
        //     }, 2000);
        // }
        

    }catch(error){
        let err = onFailure(error);
        if(err){
            dispatch(err);
        }
    }
   
   
   
  };
  
  export default apiMiddleware;
  
  
  