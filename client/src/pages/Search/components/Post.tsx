import { decodeTime } from "ulid";
import { ProjectPost } from "../../../../types";
import { FormEvent } from "react";


interface PostProps {
    post: ProjectPost
}

export const Post = ({ post } : PostProps) => {
    const date = new Date(decodeTime(post.id));

    const sendLike = (e: FormEvent) => {
        e.preventDefault();
    };

    const sendInterest = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <li key={post.id} className="post-item">
            <article>
                <h2 className="post-title">{post.title}</h2>
                <p className="body">{post.body}</p>
                <div className="author-data">
                    <p className="author">Author: {post.account.username}</p>
                    <p className="timezone">Timezone: {post.account.timezone}</p>
                </div>
                <div className="project-data">
                    <p className="posttime">Posted at: {`${date.toUTCString()}`}</p>
                    <p className="language">Language: {post.language}</p>
                    <p className="difficulty">Difficulty: {post.difficulty}</p>
                    <p className="repo"><a href={post.repo_link}>Github Repo</a></p>
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
                <button className="like-button" onClick={sendLike}>Like</button>
                <button className="interested" onClick={sendInterest}>Let's pair!</button>
            </article>
        </li>
    );
};