import NavBar from './NavBar';
import Button from '../../components/Button';
import styles from './Home.module.css';
import HeroImage from '../../assets/mobile-testing-isometric.png';


const Home = () => {
    return (
        <div className={`${styles["homepage-wrapper"]}`}>
            <div className={`${styles["homepage"]}`}>
                <header className={styles["page-header"]}>
                    <NavBar />
                </header>
                <main className={styles["main-landmark"]}>
                    <img src={HeroImage} className={styles["hero-image"]} />
                    <section aria-label='Hero' className={styles["hero-section"]}>
                        <div className={styles["hero-section-wrapper"]}>
                            <h1 className={styles["hero-heading"]}>Find your new coding community!</h1>
                            <p className={styles["hero-text"]}>
                                Newbie looking for your first collab?<br />
                                Hobbyist who wants to work with friends?<br />
                                10x Engineer in need of your dream team?<br />
                            </p>
                            <Button />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Home;