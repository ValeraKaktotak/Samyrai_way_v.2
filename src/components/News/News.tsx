import React, {useEffect, useState} from 'react';
import style from './News.module.css';

const News = () => {
    const [count, setCount] = useState(0);
    const objA ={
        one: "1",
        two: [1,2],
        three: {
            four: 4
        }
    }

    useEffect(() => {
        // Обновляем заголовок документа с помощью API браузера
        document.title = `Вы нажали ${count} раз`;
    });

    const objB = {...objA};
    objA.three.four = 44;

    console.log(objB);

    objB.three = {...objB.three}
    objA.three.four = 444;

    console.log(objB);


    return (
        <>
            <div className={style.news}>
                News
            </div>
            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(value => value +1)}>
                    Click me
                </button>
            </div>
        </>
    );
}

export default News

