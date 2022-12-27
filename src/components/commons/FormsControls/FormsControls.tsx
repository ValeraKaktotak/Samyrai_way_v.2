import React from 'react'
import style from './FormControls.module.css'
import {WrappedFieldProps} from "redux-form";

type customElemProps = (data: any) => (data: WrappedFieldProps) => JSX.Element

//функция для textarea
export const Textarea:React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.submitFailed && meta.error;
    return(
        <div className={style.formControl+' '+(hasError?style.errorBorder: '')}>
            <textarea {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

//универсальная функция
export const Element:customElemProps = (FormElement) => ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={style.formControl+' '+(hasError?style.errorBorder: '')}>
            <FormElement {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}