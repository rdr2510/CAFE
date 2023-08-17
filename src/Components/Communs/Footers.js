import {Container, Navbar} from 'react-bootstrap';

export default function Footer({Style, isAfficheStyle, onChangeTheme}) {
    //{isAfficheStyle?<StyleTheme Style={Style} onChangeTheme= {onChangeTheme}/>:''}
    return (
      <Navbar bg="primary" fixed='bottom' className='d-flex justify-content-center my-0 py-0'>
          <Container className='d-flex flex-column flex-md-row flex-lg-row justify-content-center mx-0'>
              <span className="w-100 text-center text-light">E-COMMERCE © Copyright 2023 - Réalisé par Andry &amp; Dominique Rina</span>
          </Container>
      </Navbar>
    );
}