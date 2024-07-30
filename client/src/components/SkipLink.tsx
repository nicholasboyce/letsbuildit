import styles from './SkipLink.module.css';

const SkipLink = () => {
    return (
        <a className={`${styles["skip-nav-link"]}`} href="#main-content">Skip Navigation</a>
    )
};

export default SkipLink;