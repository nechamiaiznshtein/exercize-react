
function convertActionNameToLowercase(actionName) {
    return actionName.toLowerCase().replace(/_(\w)/g, x => x[1].toUpperCase())
}

function convertActionNameToType(actionName) {
    return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
}

export default function createReducer(state, action, handlers) {
    let key = convertActionNameToLowercase(action.type);
    const handler = handlers[key];
    if (handler) {
        handler(state, action)
    }
}