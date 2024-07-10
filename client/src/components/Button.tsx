import styles from './Button.module.css';

interface ButtonProps extends HTMLButtonElement {
    size?: string;
    signedIn?: boolean;
}

const Button = ({size, signedIn, ...props} : ButtonProps) => {
    let text = '';
    if (signedIn) {
        text = 'Log Out';
    } else {
        if (size == 'small') {
            text = 'Log In With Github';
        } else {
            text = 'Sign Up With Github';
        }
    }
    return (
        <button className={`${styles.btn} ${styles[size]}`}>{text}</button>
    )
}


export default Button;