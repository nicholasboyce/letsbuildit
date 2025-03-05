import { Button, PageHeader } from '../../components';
import styles from './Home.module.css';
import HeroImage from '../../assets/mobile-testing-isometric.png';

export const Home = () => {
    const handleClick = () => {};
    return (
        <>
            <header className={styles.header}>
                <h1>Octopod 🐙</h1>
            </header>
            <main className={styles.main}>
                <h2 className={styles["hero-heading"]}>See what your fellow Recursers have been up to!</h2>
                <button className={styles.button}>Log In</button>
                <p className={styles.desc}>At RC, everyone is always making something interesting- it can be hard to keep up!
                Octopod is meant to help make it easier to find cool projects in the past and present, and make it easier for others to find you too!</p>
            </main>
        </>

    );
};