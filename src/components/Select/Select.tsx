
import { InputHTMLAttributes } from "react";
import styles from './Select.module.css';


interface ISelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    options: any[],
    icon?: JSX.Element
}

export const Select = ({title, onChange, options, className, icon}: ISelectProps) => {
    return (
        <div className={`${styles.wrap} ${className}`}>
            {title}
            <div className={styles.selectWrap}>
                {icon}
                <select onChange={onChange} className={styles.select}>
                    {options.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
                </select>
            </div>
        </div>
    )
}