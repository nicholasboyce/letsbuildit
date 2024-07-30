import styles from './PageHeader.module.css';
import SkipLink from './SkipLink';
import NavBar from '../pages/Home/NavBar';

const PageHeader = () => {
    return (
        <header className={styles["page-header"]}>
            <SkipLink />
            <NavBar />
        </header>
    )
};

export default PageHeader;