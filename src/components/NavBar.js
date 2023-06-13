import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


function NavBar() {

  const { user, googleSignOut, googleSignIn } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await googleSignOut();
    } catch (error) {
      console.log(error);
    }
  }

  const showToastMessage = () => {
    toast.info('Upcoming Feature!', {
        position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <Navbar bg="dark" expand="md" variant="dark" fixed="top">

      <ToastContainer />
      
      <Container className="text-center">
        <Link to='/' className='navbar-brand'>VQE.AI</Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
          >

            { user && user.uid && <Link to='/enhance-video' className='nav-link'>Enhance Video</Link> }
            { user && user.uid && <Link to='/enhanced-videos' className='nav-link'>Enhanced Videos</Link> }

            <Nav.Link href="https://developers.vqe.ai">API</Nav.Link>
            
            <button onClick={showToastMessage} className='nav-link'>Pricing</button>

            <NavDropdown title="Tools" id="navbarScrollingDropdown">

              <button onClick={showToastMessage} className='dropdown-item btn btn-secondary'>ChromeExtension</button>
              <NavDropdown.Divider />
              <button onClick={showToastMessage} className='dropdown-item btn btn-secondary'>Whatsapp</button>
              <NavDropdown.Divider />
              <Link to='/discord' className='dropdown-item btn btn-secondary'>Discord</Link>
              <NavDropdown.Divider />
              <button onClick={showToastMessage} className='dropdown-item btn btn-secondary'>Telegram</button>

            </NavDropdown>

          </Nav>
          { 
            user && user.uid
            ? <Button onClick={handleSignOut} className="btn btn-secondary">Sign Out</Button>
            : <Button onClick={handleSignIn} className='btn btn-secondary'>Sign In</Button>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;