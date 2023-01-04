import React from "react"
import {Navigate, Route, Routes} from "react-router-dom"
import {connect} from "react-redux"
import Sidebar from "./components/Sidebar/Sidebar"
import Profile from "./components/Profile/Profile"
import Dialogs from "./components/Dialogs/Dialogs"
import Music from "./components/Music/Music"
import News from "./components/News/News"
import Settings from "./components/Settings/Settings"
import Login from "./components/Login/Login"
import HeaderContainer from "./components/Header/HeaderContainer"
import Preloader from "./components/Preloader/Preloader"
import {initializationAppThunkActionCreator} from "./redux/app-reducer"
import './App.css'

//React Lazy
//import UsersContainer from "./components/Users/UsersContainer";
import withSuspense from "./hoc/withSuspense";
import {stateType} from "./redux/redux-store";
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

type mapPropsType = ReturnType<typeof mapStateToProps>
type dispatchPropsType = {
    initialization: () => void
}

class App extends React.Component<mapPropsType & dispatchPropsType>{
    //отлавливаем глобальные ошибку
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("SOME ERROR!!!")
    }
    componentDidMount() {
        this.props.initialization()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render(){
        if(!this.props.initialize){
            return <Preloader/>
        }
        return (
            <div className="App_wrapper">
                <HeaderContainer/>
                <Sidebar/>
                <div className="App_wrapper_content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/profile" />} />
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/profile/:userId" element={<Profile/>}/>
                        {/*<Route path="profile" element={<Profile />}>*/}
                        {/*    <Route path=":userId" element={<Profile />}/>*/}
                        {/*</Route>*/}

                        <Route path="/login" element={<Login/>}/>
                        <Route path="/dialogs" element={<Dialogs/>}/>

                        <Route path="/users" element={withSuspense(UsersContainer)}/>
                        {/*<Route path="/users" element={<Suspense fallback={<div>Загрузка...</div>}><UsersContainer/></Suspense>}/>*/}
                        {/*<Route path="/users" element={<UsersContainer/>}/>*/}

                        <Route path="/news" element={<News />}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store: stateType) => ({
    initialize: store.app.initialized
})

export default connect(mapStateToProps, {
    initialization:initializationAppThunkActionCreator
})(App)
