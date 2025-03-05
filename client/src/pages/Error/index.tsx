import { Suspense } from "react";
import { wrapPromise } from "../../utils/wrapPromise";
import { DogPic } from "./components/DogPic";

export const ErrorPage = () => {

    const fetchCuteDogPic = async () => {
        const response = await fetch(" https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        const url : string = data.message;
        return url;
    };

    const resourcePromise = wrapPromise(fetchCuteDogPic());

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <DogPic resource={resourcePromise} />
        </Suspense>
    );
};

