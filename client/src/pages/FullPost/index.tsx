import { useParams } from "react-router-dom";

export const FullPost = () => {
    const { id } = useParams();
    return (
        <h1>Hi! {id}</h1>
    );
};