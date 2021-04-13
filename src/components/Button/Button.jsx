import React from "react"

import styles from './Button.module.css'

export const Button = ({text, variant, onClick}) => (
    <button onClick={onClick} className={`${styles[variant]} ${styles.container}`}>
        {text}
    </button>
)