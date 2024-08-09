import styles from './PageHeader.module.css';
import SkipLink from './SkipLink';
import { NavBar } from './NavBar';

export const PageHeader = () => {
    return (
        <header className={styles["page-header"]}>
            <SkipLink />
            <NavBar />
        </header>
    )
};