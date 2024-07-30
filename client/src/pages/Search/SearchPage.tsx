import styles from './SearchPage.module.css';
import PageHeader from "../../components/PageHeader";

const SearchPage = () => {
    return (
        <div className={`${styles["page-wrapper"]}`}>
            <div className={`${styles["page"]}`}>
                <PageHeader />
                <main className={styles["main-landmark"]}>
                </main>
            </div>
        </div>
    )
};

export default SearchPage;