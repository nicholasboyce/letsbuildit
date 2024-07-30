import styles from './SearchPage.module.css';
import PageHeader from "../../components/PageHeader";

const SearchPage = () => {
    return (
        <div className={`${styles["page-wrapper"]}`}>
            <div className={`${styles["page"]}`}>
                <PageHeader />
                <main className={styles["main-landmark"]}>
                    <h1 id='search-label'>Find your new coding community!</h1>
                    <search aria-labelledby='search-label'>
                        <form id='main-content' aria-label='Project search'>
                            <label htmlFor="project-search">Project Title</label>
                            <input type="search" name="project-search" id="project-search" />
                            <label htmlFor="difficulty">Difficulty</label>
                            <select name="difficulty" id="difficulty"></select>
                            <label htmlFor="language">Language</label>
                            <select name="language" id="language"></select>
                            <label htmlFor="timezone">Timezone</label>
                            <select name="timezone" id="timezone"></select>
                            <button type='submit'>Search Projects</button>
                        </form>
                    </search>
                </main>
            </div>
        </div>
    )
};

export default SearchPage;