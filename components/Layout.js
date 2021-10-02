import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
 
import Link from 'next/link';

function Layout({ children }) {
    return (
    <div>
        <Head>
          <title>Curriculum: Camilo Ardila</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar fixed="top" bg="dark" expand="lg" variant="dark">
            <Container>
                <Link href="/" passHref>
                    <Navbar.Brand>
                        <a>Camilo Ardila</a>
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto justify-content-end" style={{ width: "100%" }}>
                        <Link href="/" passHref>
                            <Nav.Link>Home</Nav.Link>
                        </Link>
                        <Link href="/curriculum" passHref>
                            <Nav.Link>Curriculum</Nav.Link>
                        </Link>
                        <NavDropdown title="Posts" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Python</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Javascript</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">R</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Economía</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Inteligencia artificial</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> <br />
        <div>
            <div className={styles.espaciado}>
                {children}
            </div>
        </div>
    </div>
    )
};

export default Layout;


/* 
NOTA: getStaticProps() se utilizan exclusivamente para los componentes de paginas, es decir
que estan dentro de la carpeta `pages` 

export async function getStaticProps() {
    console.log(`1`)
    const posts = await getAllFilesMetadata();
    
    return {
      props: { posts },
    };
  } */