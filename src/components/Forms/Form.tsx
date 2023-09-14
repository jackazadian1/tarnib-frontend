import { FormEvent, PropsWithChildren, ReactNode } from 'react';
import styles from './Form.module.css';

interface FormProps{
    children: ReactNode;
    submitHandler: (event: FormEvent<HTMLFormElement>, formData?:any) => void;
}

export default function Form({ children, submitHandler }: FormProps) {
    return (
        <form className={styles.container} onSubmit={submitHandler}>
            {children}
        </form>
    );
}
