import styles from "../Error.module.css";

export const DogPic = ({ resource }) => {
    const url = resource.read();

    console.log("Woof!");
    
    return (
        <figure>
            <img src={url} alt="An adorable picture of a dog to soothe the soul." width="500px" height="500px" style={styles}/>
            <figcaption> Sorry we couldn't find what you were looking for. This sweet pupper came to cheer you up.</figcaption>
        </figure>
    );
};