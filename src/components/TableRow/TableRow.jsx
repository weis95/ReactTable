import React, { useState } from "react"
import { InputField } from '../InputField/InputField'
import { Button } from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from './TableRow.module.css'

export const TableRow = ({ name, email, phone, onClick, id, onCancel, onDelete}) => {
    const [read, setRead] = useState(true);
    const [edit, setEdit] = useState('tableRow');
    const [value, setValue] = useState({name, email, phone, id});

    function editRow(event, boolean){
        if(boolean){
            setRead(false);
            setEdit('editable');
        } else {
            setRead(true);
            setEdit('tableRow');
            onCancel(event)
        }
    }

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

    const ActionButtons = () => {
        if(read === true) {
            return (
                <React.Fragment>
                    <td onClick={ (event) => editRow(event, read) }> 
                        <FontAwesomeIcon icon={faPen} /> 
                    </td>
                    <td>
                        <FontAwesomeIcon onClick={(event) => onDelete(event, value.id)} icon={faTrash} />
                    </td>
                </React.Fragment>
            )
        } else {
            return ( 
                <React.Fragment>
                    <td onClick={ (event) => editRow(event, read) }>
                        <Button variant={'cancel'} text={'Cancel'} />
                    </td>
                    <td>
                        <Button onClick={(event) => onClick(event, value.name, value.email, value.phone, value.id)} variant={'save'} text={'Save'} />
                    </td>
                </React.Fragment>
            )
        }
    }

    return (
        <tr className={styles.container}>
            <td>
                <InputField 
                    value={value.name} 
                    variant={edit} 
                    onChange={(event) => onChange(event, 'name')} 
                    readOnly={read}
                />
            </td>
            <td>
                <InputField 
                    value={value.email} 
                    variant={edit} 
                    onChange={(event) => onChange(event, 'email')} 
                    readOnly={read}
                />
            </td>
            <td>
                <InputField 
                    value={value.phone} 
                    variant={edit} 
                    onChange={onChange} 
                    readOnly={read}
                />
            </td>
            <ActionButtons/>
        </tr>
    )
}