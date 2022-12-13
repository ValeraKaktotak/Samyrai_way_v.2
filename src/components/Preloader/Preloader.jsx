import spinner from '../../assets/images/Yin and Yang.gif';
import style from './Preloder.module.css';

const Preloader = () => {
    return(
        <div className={style.loader}>
            <img src={spinner} alt="spinner"/>
        </div>
    )
}

export default Preloader