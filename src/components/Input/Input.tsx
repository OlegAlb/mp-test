import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputHTMLAttributes } from "react";
import styles from './Input.module.css';
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({title, placeholder, onInput}: IInputProps) => {
    return (
        <div className={styles.wrap}>
            {title}
            <div className={styles.inputWrap}>
                <FontAwesomeIcon icon={faQuestion} />
                <input className={styles.input} type="text" placeholder={placeholder} onChange={onInput} />
            </div>
        </div>
    )
}