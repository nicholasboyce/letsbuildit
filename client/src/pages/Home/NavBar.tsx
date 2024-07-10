import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <Link to="/">Let's Build It!</Link>
            <Button size='small' />
        </nav>
    )
};

export default NavBar;