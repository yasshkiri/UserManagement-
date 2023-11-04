import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
// reactstrap components
import {
  Button,
  Col,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row,
  UncontrolledTooltip,
} from 'reactstrap'

export default function LoginNavbar () {
  const navigate = useNavigate()
  const [collapseOpen, setCollapseOpen] = React.useState(false)
  const [collapseOut, setCollapseOut] = React.useState('')
  const [color, setColor] = React.useState('navbar-transparent')
  React.useEffect(() => {
    window.addEventListener('scroll', changeColor)
    return function cleanup () {
      window.removeEventListener('scroll', changeColor)
    }
  }, [])
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor('bg-info')
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor('navbar-transparent')
    }
  }
  const toggleCollapse = () => {
    document.documentElement.classList.toggle('nav-open')
    setCollapseOpen(!collapseOpen)
  }
  const onCollapseExiting = () => {
    setCollapseOut('collapsing-out')
  }
  const onCollapseExited = () => {
    setCollapseOut('')
  }
  const logoStyle = {
    width: '25px', // ajustez la largeur selon vos besoins
    height: '25px', // ajustez la hauteur selon vos besoins
    marginRight: '5px', // ajustez la marge droite selon vos besoins
  }
  return (
    <Navbar className={'fixed-top ' + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" id="navbar-brand">
            <span>
              <img
                src={require('assets/img/favicon.png')}
                alt="            Company Sms
 Logo"
                className="logo-image"
                style={logoStyle}
              />
              •
            </span>
            Company Sms
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Company Sms
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1"/>
            <span className="navbar-toggler-bar bar2"/>
            <span className="navbar-toggler-bar bar3"/>
          </button>
        </div>
        <Collapse
          className={'justify-content-end ' + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">

                  <span>
                    <img
                      src={require('assets/img/favicon.png')}
                      alt="            Company Sms
 Logo"
                      className="logo-image"
                      style={logoStyle}
                    />
                    •
                  </span>
                  Company Sms
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove"/>
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/AttijariwafaB"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fab fa-twitter"/>
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.attijaribank.com.tn/Fr/ "
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="tim-icons icon-world"/>
                <p className="d-lg-none d-xl-none">WebSite</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/AttijariBankTunisie/"
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fab fa-facebook-square"/>
                <p className="d-lg-none d-xl-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/attijari_bank_tunisie/?hl=fr"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fab fa-instagram"/>
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                onClick={() => navigate(`/register-page`)}
                style={{
                  backgroundImage:
                    'linear-gradient(to bottom left, #edae3c, #dc5949, #120f11)',
                }}
              >
                <FiLogIn className="mr-2"/>
                créer un compte
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}
