import React, { useState } from "react"
import { InputField } from '../InputField/InputField'
import { Button } from '../Button/Button'

import styles from './Form.module.css'

export const Form = ({onClick}) => {
    const [value, setValue] = useState({});

    const onChange = (event, key) => {
        switch (key) {
            case 'name':
                setValue({
                    ...value,
                    name: event.target.value,
                });
                break
            case 'email':
                setValue({
                    ...value,
                    email: event.target.value,
                });
                break
            default:
                setValue({
                    ...value,
                    phone: event.target.value
                });
        }
    };

    return (
        <form className={styles.container}>
            <span>
                <InputField 
                    onChange={(event) => onChange(event, 'name')}  
                    variant={'editable'} 
                    placeholder={'Full name'}
                />
                <InputField 
                    onChange={(event) => onChange(event, 'email')} 
                    variant={'editable'} 
                    placeholder={'E-mail address'}
                />
                <InputField 
                    onChange={(event) => onChange(event, 'phone')} 
                    variant={'editable'} 
                    placeholder={'Phone number'}
                />
            </span>
            <Button 
                onClick={(event) => onClick(event, value.name, value.email, value.phone)} 
                variant={'add'} 
                text={'Add new'}
            />
        </form>
    )
}