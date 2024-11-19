import { useSearchParams } from "react-router-dom";
import { usePostSearch } from "./utils/usePostSearch";

export const Feed = () => {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const posts = usePostSearch(searchParams);

    return (
        <main>
            <h1>Search For Info</h1>
            <form id="search-form">
                <input type="search" />
                <button>Search</button>

                <output name="result">
                    <ul className="posts">
                        {posts.map((post) => {
                            return (
                                <li key={post.id} className="post-item">
                                    <article>
                                        <h2 className="post-title">{post.title}</h2>
                                        <p className="body">{post.body}</p>
                                        <div className="author-data">
                                            <p className="author">{post.username}</p>
                                            <p className="posttime">{post.created_at}</p>
                                        </div>
                                        <div className="project-data">
                                            {/** embed user data into post return data */}
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
        </main>
    );
}