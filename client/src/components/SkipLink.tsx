import styles from './SkipLink.module.css';

export const SkipLink = () => {
    return (
        <a className={`${styles["skip-nav-link"]}`} href="#main-content">Skip Navigation</a>
    )
};