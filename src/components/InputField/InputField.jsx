import React from "react"
import PropTypes from 'prop-types';

import styles from './InputField.module.css'

export const InputField = ({type, placeholder, value, variant, readOnly, onChange}) => (
    <input 
        className={`${styles[variant]} ${styles.container}`} 
        type={type} 
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
    />
)

InputField.propTypes = {
    onChange: PropTypes.func
};