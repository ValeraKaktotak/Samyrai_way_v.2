export type postDataType = {
    id: number
    message: string
    likes: number
    avatar: string
}
export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType = {
    small: string | null
    large: string | null
}
export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
    aboutMe?: string
}

 //users-reducer
export type usersPhotosType = {
    small: null | string
    large: null | string
}
export type usersType = {
    name: string
    id: number
    photos: usersPhotosType
    status: null | string
    followed: boolean
    location?: string
}

//messages-reducer
export type messagesReducerDialogDataType = {
    id: number
    name: string
}
export type messagesReducerMessageDataType = {
    id: number
    message: string
}
export type messagesReducerMessageType = {
    userMessage: string
}