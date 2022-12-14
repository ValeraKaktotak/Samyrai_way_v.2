const addMessageActionCreatorConst = 'ADD-MESSAGE';
const changeMessageTextActionCreatorConst = 'CHANGE-MESSAGE-TEXT';


type changeMessageTextActionType = {
    type: typeof changeMessageTextActionCreatorConst
    newText: string
}
export const changeMessageTextActionCreator = (text: string): changeMessageTextActionType => {
    return {
        type: changeMessageTextActionCreatorConst,
        newText: text
    }
}

type addMessageActionType = {
    type: typeof addMessageActionCreatorConst
    message: string
}
type messageType = {
    userMessage: string
}
export const addMessageActionCreator = (message: messageType): addMessageActionType => {
    return {
        type: addMessageActionCreatorConst,
        message: message.userMessage
    }
}

type dialogDataType = {
    id: number
    name: string
}
type messageDataType = {
    id: number
    message: string
}
type messagesReducerInitType = {
    dialogData: Array<dialogDataType>
    messageData: Array<messageDataType>
    newMessageDataArea: string
}
const messagesReducerInit: messagesReducerInitType = {
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
    newMessageDataArea: ''
}
const messagesReducer = (state = messagesReducerInit, action: changeMessageTextActionType | addMessageActionType) => {
    if (action.type === changeMessageTextActionCreatorConst) {
        return {
            ...state,
            newMessageDataArea: action.newText
        }
    } else if (action.type === addMessageActionCreatorConst) {
        let newMessageObject = {
            id: state.messageData.length + 1,
            message: action.message
        }
        return {
            ...state,
            messageData: [newMessageObject, ...state.messageData],
            newMessageDataArea: ''
        }
    }
    return state
}

export default messagesReducer