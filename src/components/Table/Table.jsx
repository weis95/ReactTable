import React, { useState, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import { TableRow } from '../TableRow/TableRow'
import { Form } from '../Form/Form'

import styles from './Table.module.css'

const Table = ({participants}) =>  {
    const [array, setArray] = useState([]);
    const [sorted, setSorted] = useState('');

    useEffect(() => {
        setArray(participants)
    }, [participants])

    function sortData(event, key) {
        if(sorted !== key) {
            array.sort((a,b) => (a[key] > b[key]) ? 1 : (b[key] > a[key]) ? -1 : 0);
            setSorted(key)
        } /* Reverse sorting 
        else {
            array.sort((a,b) => (a[key] > b[key]) ? -1 : (b[key] > a[key]) ? 1 : 0);
            setSorted('')
        } */
    }
    
    function doNotRefresh(event, newArray) {
        /*Messy but works "needs more engineering" */
        event.preventDefault();
        setArray([])
        setArray(newArray)
    }
    const addObject = (event, name, email, phone) => {
        if(!name || !email || !phone){
            event.preventDefault();
            alert('Form validation failed');
            return false;
        }
        const idGenerator = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
        const theNewPropertiesToAdd = {
            id: idGenerator,
            name,
            email,
            phone
        }
        array.push(theNewPropertiesToAdd)
        const newArray = [...array]

        doNotRefresh(event, newArray)
    }

    const deleteObject = (event, id) => {
        const objectId = array.map(function(item) { return item.id; }).indexOf(id)
        array.splice(objectId, 1);
        const newArray = [...array]
        doNotRefresh(event, newArray)
    }

    const editObject = (event, name, email, phone, id) => {
        const object = array.find(object => object.id === id);
        object.name = name;
        object.email = email;
        object.phone = phone;
        const newArray = [...array]
        doNotRefresh(event, newArray)
    }

    const cancelEdit = (event) => {
        const newArray = [...array]
        doNotRefresh(event, newArray)
    }

    const TableData = ({array}) => (
        array.map(participant => 
            <TableRow
                key={participant.id}
                name={participant.name}
                email={participant.email}
                phone={participant.phone}
                id={participant.id}
                onClick={editObject}
                onCancel={cancelEdit}
                onDelete={deleteObject}
            />
        )
    )

    return (        
        <div className={styles.container}>
            <h3>List of Participants</h3>
            <Form onClick={addObject}/>
            <table>
                <thead>
                    <tr>
                        <th onClick={(event) => sortData(event, 'name' )}>
                            Name {sorted === 'name' ? <FontAwesomeIcon icon={faArrowDown} /> : ''}
                        </th>
                        <th onClick={(event) => sortData(event, 'email' )}>
                            E-mail address {sorted === 'email' ? <FontAwesomeIcon icon={faArrowDown} /> :  ''} 
                        </th>
                        <th onClick={(event) => sortData(event, 'phone' )}>
                            Phone Number {sorted === 'phone' ?  <FontAwesomeIcon icon={faArrowDown} />  : ''} 
                        </th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <TableData array={array}/>
                </tbody>
            </table>
        </div>
    );
}

export default Table;