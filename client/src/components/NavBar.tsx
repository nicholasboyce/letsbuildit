import { Button } from './Button';
import { Link, Outlet } from 'react-router-dom';
import styles from './NavBar.module.css';

export const NavBar = () => {
    return (
        <>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.logo}>Octopod</Link>
                {/* <Button authType='login' /> */}
            </nav>
            <Outlet />
        </>
    )
};