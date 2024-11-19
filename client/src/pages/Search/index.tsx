import styles from './SearchPage.module.css';
import { PageHeader } from '../../components';
import { useSearchParams } from "react-router-dom";
import { usePostSearch } from '../Feed/utils/usePostSearch';
import { FormEvent } from 'react';
import { z } from 'zod';


export const SearchPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const posts = usePostSearch(searchParams);

    const FormSchema = z.object({
        projectTitle: z.string(),
        difficulty: z.string(),
        language: z.string(),
        timezone: z.string(),
        sortOrder: z.string()
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const rawData = new FormData(e.currentTarget as HTMLFormElement);

        const result = FormSchema.safeParse(Object.fromEntries(rawData.entries()));
        if (!result.success) {
            console.log(result.error);
        } else {
            const fullyParsed = new URLSearchParams(result.data);
            setSearchParams(fullyParsed);
        }
    };

    return (
        <div tabIndex={0} className={`${styles["page-wrapper"]}`}>
            <div className={`${styles["page"]}`}>
                <PageHeader />
                <main className={styles["main-landmark"]}>
                    <h1 id='search-label'>Find your new coding community!</h1>
                    <search aria-labelledby='search-label'>
                        <form id='main-content' aria-label='Project search' onSubmit={handleSubmit}>
                            <label htmlFor="project-title">Project Title: </label>
                            <input type="search" name="projectTitle" id="project-title" />
                            <label htmlFor="difficulty">Difficulty: </label>
                            <select name="difficulty" id="difficulty">
                                <option value=""></option>
                                <option value="novice">Novice</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="senior">Senior</option>
                            </select>
                            <label htmlFor="language">Language: </label>
                            <select name="language" id="language" onChange={(e) => console.log(e.target.value)}>
                                <option value=""></option>
                                <option value="javascript">Javascript</option>
                                <option value="java">Java</option>
                                <option value="python">Python</option>
                                <option value="go">Go</option>
                                <option value="c++">C++</option>
                            </select>
                            <label htmlFor="timezone">Timezone: </label>
                            <select name="timezone" id="timezone">
                                <option value=""></option>
                                <option value="est">EST</option>
                                <option value="mst">MST</option>
                                <option value="pt">PT</option>
                                <option value="gmt">GMT</option>
                            </select>
                            <label htmlFor="sortOrder">Sort By: </label>
                            <select name="sortOrder" id="sortOrder">
                                <option value=""></option>
                                <option value="new">New</option>
                                <option value="likes">Likes</option>
                            </select>
                            <button type='submit'>Search Projects</button>
                            <output name="result">
                                <ul className="posts">
                                    {posts.map((post) => {
                                        return (
                                            <li key={post.id} className="post-item">
                                                <article>
                                                    <h2 className="post-title">{post.title}</h2>
                                                    <p className="body">{post.body}</p>
                                                    <div className="author-data">
                                                        <p className="author">{post.account.username}</p>
                                                        <p className="post-time">{post.created_at}</p>
                                                    </div>
                                                    <div className="project-data">
                                                        <p className="timezone">{post.account.timezone}</p>
                                                        <p className="language">{post.language}</p>
                                                        <p className="difficulty">{post.difficulty}</p>
                                                    </div>
                                                    <aside>
                                                        <h2>Team Members</h2>
                                                        <ul className="members">
                                                            {post.team_members.map((member) => {
                                                                return (
                                                                    <li className="member" key={member.username}>{member.username}</li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </aside>
                                                    <button className="like-button">Like</button>
                                                    <button className="interested">Let's pair!</button>
                                                </article>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </output>
                        </form>
                    </search>
                </main>
            </div>
        </div>
    )
};