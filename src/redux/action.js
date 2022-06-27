import React from 'react';


function convertActionNameToType(actionName) {
    return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
}


export const action = new Proxy({},
    {
        get: function (target, props) {
            if (target[props] === undefined) {
                return function (args) {
                    return {
                        type: convertActionNameToType(props),
                        payload: args
                    }
                }
               
            } else return target[props]
            
        }
    })