
//передаем часть данных связанных с данным редьюсером для первого рендера(создание state)
const sidebarReducerInit = {
    friends: [
        {id: 1, avatar: 'https://marvel.com.ru/imagecache/original/uploads/images/ued3m0s0HRwkYy6KAM1F.png'},
        {id: 2, avatar: 'https://i.pinimg.com/736x/f5/78/b7/f578b78a53a98d9260961235f83408c1.jpg'},
        {id: 3, avatar: 'https://images-on-off.com/images/49/fireplamyageroimarvelmarvelidccomics-673fe4c4.jpg'}
    ]
}
type sidebarReducerType = typeof sidebarReducerInit
const sidebarReducer = (state = sidebarReducerInit, action: any): sidebarReducerType => {
    return state
}

export default sidebarReducer