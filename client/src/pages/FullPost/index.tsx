import { PageHeader } from '../../components';
import { useParams } from "react-router-dom";

export const FullPost = () => {
    const { id } = useParams();
    return (
        <>
            <PageHeader />
            <h1>Hi! {id}</h1>
        </>
    );
};