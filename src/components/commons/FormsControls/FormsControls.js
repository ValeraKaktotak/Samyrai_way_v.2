import style from './FormControls.module.css'

//фенкция для textarea
export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.submitFailed && meta.error;
    return(
        <div className={style.formControl+' '+(hasError?style.errorBorder: '')}>
            <textarea {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

//универсальная функция
export const Element = (FormElement) => ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={style.formControl+' '+(hasError?style.errorBorder: '')}>
            <FormElement {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}