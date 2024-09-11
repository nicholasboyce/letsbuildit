import { useEffect, useState } from 'react';
import styles from './select.module.css';

export interface SelectOption {
    label: string
    value: string | number
}

interface SelectProps {
    options: SelectOption[]
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
}

export const Select = ({ options, value, onChange } : SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const clearOptions = () => onChange(undefined);
    const selectOption = (option: SelectOption) => (option !== value) && onChange(option);
    const isOptionSelected = (option: SelectOption) => option == value;

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);

    return (
        <div 
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)} 
            tabIndex={0} 
            className={styles.container}
        >
            <label className={styles["value"]} role='label'>{value?.label}</label>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    clearOptions();
                }} 
                className={styles["clear-btn"]}
                role='combobox'
            >
                &times;
            </button>
            <div className={styles["divider"]}></div>
            <div className={styles["caret"]}></div>
            <ul className={`${styles["options"]} ${isOpen ? styles.show : ""}`} role='listbox'>
                {options.map((option, index) => (
                    <li 
                        onClick={e => {
                            e.stopPropagation();
                            selectOption(option);
                            setIsOpen(false);
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)} 
                        key={option.value} 
                        className={`
                            ${styles.option} 
                            ${isOptionSelected(option) ? styles.selected : ""}
                            ${highlightedIndex == index ? styles.highlighted : ""}
                        `} 
                        role='option'
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    )
};