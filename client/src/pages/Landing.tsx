import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const Landing = () => {
    const { user } = useAppContext();
    return (
        <>
            {user && <Navigate to="/" />}
            <Wrapper>
                <nav>
                    <Logo />
                </nav>
                <div className="container page">
                    <div className="info">
                        <h1>
                            job <span>tracking</span> app
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
                            ducimus incidunt itaque magnam quam voluptates. Eius nesciunt, nisi.
                            Distinctio, ea exercitationem ipsa nihil omnis quaerat quia rem
                            repudiandae sunt voluptas?
                        </p>
                        <Link to="/register" className="btn btn-hero">
                            Login/Register
                        </Link>
                    </div>
                    <img src={main} alt="job hunt" className="img main-img" />
                </div>
            </Wrapper>
        </>
    );
};

export default Landing;
