import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {Nav, Navbar} from "react-bootstrap";
import styled from "styled-components";

export default function Navigation() {
    const navigate = useNavigate();
    const {currentUser, logout, setError, isAdmin, userMetadata} = useAuth();

    async function handleLogout() {
        try {
            setError("");
            await logout();
            navigate("/login");
        } catch {
            setError("Failed to logout");
        }
    }

    return (



        <NavbarWrapper collapseOnSelect expand="lg" style={{backgroundColor: "#FFDA29"}} variant="light">
            <Navbar.Brand href='home'>Pet.Me</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href='cart'>My Cart</Nav.Link>
                    <Nav.Link href='orders'>My Orders</Nav.Link>
                    {isAdmin && <Nav.Link href='management'>Management</Nav.Link>}
                </Nav>
                <Nav>
                    <Navbar.Text>Hi, {userMetadata?.name} |</Navbar.Text>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </NavbarWrapper>
    );
}

const NavbarWrapper = styled(Navbar)`
  padding: 1em 3em 1em 3em;
`;