import { Button } from './Button';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

export const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>Let's Build It!</Link>
            <Button authType='login' />
        </nav>
    )
};