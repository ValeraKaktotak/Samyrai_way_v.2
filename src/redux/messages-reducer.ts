import {
    messagesReducerDialogDataType,
    messagesReducerMessageDataType,
    messagesReducerMessageType
} from "../types/types";

const addMessageActionCreatorConst = 'ADD-MESSAGE';
const changeMessageTextActionCreatorConst = 'CHANGE-MESSAGE-TEXT';


type changeMessageTextActionType = {
    type: typeof changeMessageTextActionCreatorConst
    newText: string
}

export type addMessageActionType = {
    type: typeof addMessageActionCreatorConst
    message: string
}

export const addMessageActionCreator = (message: messagesReducerMessageType): addMessageActionType => {
    return {
        type: addMessageActionCreatorConst,
        message: message.userMessage
    }
}

const messagesReducerInit = {
    dialogData: [
        {id: 1, name: 'Valera'},
        {id: 2, name: 'Dima'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Marina'},
        {id: 5, name: 'Lena'},
    ] as Array<messagesReducerDialogDataType>,
    messageData: [
        {id: 1, message: 'Hi:)'},
        {id: 2, message: 'hi hi hi:)'},
        {id: 3, message: 'Hello!)))'},
        {id: 4, message: 'How are you?)'},
        {id: 5, message: 'Are you ok?'},
    ] as Array<messagesReducerMessageDataType>,
    newMessageDataArea: '' as string
}
type messagesReducerInitType = typeof messagesReducerInit

const messagesReducer = (state = messagesReducerInit, action: changeMessageTextActionType | addMessageActionType):messagesReducerInitType => {
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