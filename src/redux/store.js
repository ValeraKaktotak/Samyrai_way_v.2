import sidebarReducer from "./sidebar-reducer";
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";

let store = {
    _state: {
        messagesPage: {
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
        },
        profilePage: {
            postData: [
                {
                    id: 1,
                    message: 'Hi, it\'s my first post',
                    likes: 21,
                    avatar: 'https://meragor.com/files/styles//ava_800_800_wm/avto-bmv_bmw-fon-transport-41424.jpg'
                },
                {
                    id: 2,
                    message: 'Hi, it\'s my second post',
                    likes: 11,
                    avatar: 'https://meragor.com/files/styles//ava_800_800_wm/avto-bmv_bmw-fon-transport-41424.jpg'
                },
                {
                    id: 3,
                    message: 'Hi, it\'s my third post',
                    likes: 15,
                    avatar: 'https://meragor.com/files/styles//ava_800_800_wm/avto-bmv_bmw-fon-transport-41424.jpg'
                },
            ],
            newMessageArea: ''
        },
        sidebar: {
            friends: [
                {id: 1, avatar: 'https://marvel.com.ru/imagecache/original/uploads/images/ued3m0s0HRwkYy6KAM1F.png'},
                {id: 2, avatar: 'https://i.pinimg.com/736x/f5/78/b7/f578b78a53a98d9260961235f83408c1.jpg'},
                {id: 3, avatar: 'https://images-on-off.com/images/49/fireplamyageroimarvelmarvelidccomics-673fe4c4.jpg'}
            ]
        }
    },
    _render() {
    },
    subscribe(observer) {
        this._render = observer;
    },
    getState() {
        return this._state;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._render(this._state);
    }
}


export default store
