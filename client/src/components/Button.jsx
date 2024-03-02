import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({size, signedIn}) => {
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
        <button className={`${styles.btn} ${ styles[size]}`}>{text}</button>
    )
}

Button.propTypes = {
    size: PropTypes.string,
    signedIn: PropTypes.bool
}

export default Button;