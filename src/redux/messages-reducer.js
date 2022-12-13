const addMessageActionCreatorConst = 'ADD-MESSAGE';
const changeMessageTextActionCreatorConst = 'CHANGE-MESSAGE-TEXT';

export const changeMessageTextActionCreator = (text) => {
    return {
        type: changeMessageTextActionCreatorConst,
        newText: text
    }
}
export const addMessageActionCreator = (message) => {
    return {
        type: addMessageActionCreatorConst, message:message.userMessage
    }
}

//передаем часть данных связанных с данным редьюсером для первого рендера(создание state)
const init = {
    dialogData: [
        {id: 1, name: 'Valera'},
        {id: 2, name: 'Dima'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Marina'},
        {id: 5, name: 'Lena'},
    ],
    messageData: [
        {id: 1, message: 'Hi:)'},
        {id: 2, message: 'hi hi hi:)'},
        {id: 3, message: 'Hello!)))'},
        {id: 4, message: 'How are you?)'},
        {id: 5, message: 'Are you ok?'},
    ],
    newMessageDataArea: '',
    reselectTest: 1
}
const messagesReducer = (state = init, action) => {
    if (action.type === changeMessageTextActionCreatorConst) {
        // let copyState = {...state};
        // copyState.newMessageDataArea = action.newText;
        // return copyState;
        return{
            ...state,
            newMessageDataArea: action.newText
        }
    } else if (action.type === addMessageActionCreatorConst) {
        let newMessageObject = {
            id: 6,
            message: action.message
        }
        // let copyState = {...state};
        // copyState.messageData = [...state.messageData]
        // copyState.messageData.unshift(newMessageObject);
        // copyState.newMessageDataArea = '';
        // return copyState;
        return{
            ...state,
            messageData: [newMessageObject, ...state.messageData],
            newMessageDataArea: ''
        }
    } else if (action.type === "FAKE"){
        return{
            ...state,
            reselectTest: state.reselectTest + 1
        }

    }
    return state
}

export default messagesReducer