import styles from './Button.module.css';
import GithubLogo from './GithubLogo';
import useWindowDimensions from '../utils/useWindowDimensions';

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    authType?: string;
    signedIn?: boolean;
}

export const Button = ({authType, signedIn, ...props} : ButtonProps) => {
    const { width: screenSize } = useWindowDimensions();
    const onClick = () => {
        window.location.assign('/api/auth/github');
    };
    let text = '';
    if (signedIn) {
        text = 'Log Out';
    } else {
        if (authType == 'login') {
            text = 'Log In';
        } else {
            text = 'Sign Up';
        }
        if (screenSize >= 360) {
            text = text.concat(' With Github');
        }
    }
    return (
        <button className={`${styles.btn} ${styles.authType}`} onClick={onClick} {...props}>
            <GithubLogo />
            {text}
        </button>
    )
};