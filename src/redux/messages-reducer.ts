import {
    messagesReducerDialogDataType,
    messagesReducerMessageDataType,
    messagesReducerMessageType
} from "../types/types"
import {inferActionsTypes} from "./redux-store"

export const messageActionsCreators = {
    addMessageActionCreator: (message: messagesReducerMessageType) => ({type: 'SN/MSS/ADD-MESSAGE', message} as const)
}
type messageActionsTypes = inferActionsTypes<typeof messageActionsCreators>


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

const messagesReducer = (state = messagesReducerInit, action: messageActionsTypes):messagesReducerInitType => {
    switch (action.type) {
        case 'SN/MSS/ADD-MESSAGE':
            let newMessageObject: messagesReducerMessageDataType = {
                id: state.messageData.length + 1,
                message: action.message.userMessage
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