import styles from './SearchPage.module.css';
import { PageHeader } from '../../components';
import { Select } from './components';
import { useState } from 'react';

const testOptions = [
    { label: 'First', value: 1 },
    { label: 'Second', value: 2 },
    { label: 'Third', value: 3 },
    { label: 'Fourth', value: 4 },
    { label: 'Fifth', value: 5 },
];

export const SearchPage = () => {
    const[value, setValue] = useState<typeof testOptions[0] | undefined>(testOptions[0]);
    return (
        <div tabIndex={0} className={`${styles["page-wrapper"]}`}>
            <div className={`${styles["page"]}`}>
                <PageHeader />
                <main className={styles["main-landmark"]}>
                    <h1 id='search-label'>Find your new coding community!</h1>
                    <search aria-labelledby='search-label'>
                        <form id='main-content' aria-label='Project search'>
                            <label htmlFor="project-search">Project Title: </label>
                            <input type="search" name="project-search" id="project-search" />
                            <label htmlFor="difficulty">Difficulty: </label>
                            <select name="difficulty" id="difficulty"></select>
                            <label htmlFor="language">Language: </label>
                            <select name="language" id="language"></select>
                            <label htmlFor="timezone">Timezone: </label>
                            <select name="timezone" id="timezone"></select>
                            <label htmlFor="sortOrder">Sort By: </label>
                            <select name="sortOrder" id="sortOrder"></select>
                            <button type='submit'>Search Projects</button>
                        </form>
                    </search>
                    <Select options={testOptions} value={value} onChange={o => setValue(o)} />
                </main>
            </div>
        </div>
    )
};