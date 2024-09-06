import { useState } from 'react';
import styles from './select.module.css';

interface SelectOption {
    label: string
    value: any
}

interface SelectProps {
    options: SelectOption[]
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
}

export const Select = ({ options, value, onChange } : SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div 
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)} 
            tabIndex={0} 
            className={styles.container} 
            role='combobox'
        >
            <span className={styles["value"]}>{value?.label}</span>
            <button className={styles["clear-btn"]}>&times;</button>
            <div className={styles["divider"]}></div>
            <div className={styles["caret"]}></div>
            <ul className={`${styles["options"]} ${isOpen ? styles.show : ""}`} role='listbox'>
                {options.map(option => (
                    <li key={option.label} className={styles.option} role='option'>
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    )
};