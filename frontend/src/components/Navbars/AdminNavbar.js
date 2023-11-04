import React, { useEffect, useMemo, useState } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// reactstrap components
import {
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavLink,
  UncontrolledDropdown,
} from 'reactstrap'
import { getUserAuth, logout } from '../../Service/apiUser'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function AdminNavbar (props) {
  const [user, setUser] = useState([])
  const navigate = useNavigate()
  //cookies
  const jwt_token = Cookies.get('jwt_token')
/////cookies
  if (!Cookies.get('jwt_token')) {
    window.location.replace('/login-page')
  }

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  ////////

  useEffect(() => {
    const getAuthUser = async (config) => {
      await getUserAuth(config)
      .then((res) => {
        setUser(res.data.user)
        // console.log(res.data.user);
      })
      .catch((err) => {
        console.log(err)
      })
    }
    getAuthUser(config)
    const interval = setInterval(() => {
      getAuthUser(config) // appel répété toutes les 10 secondes
    }, 300000)
    return () => clearInterval(interval) // nettoyage à la fin du cycle de vie du composant
  }, [config])
  const log = async () => {
    try {
      logout(config)
      .then(() => {
        // console.log(res.data.user);
        window.location.replace(`/login-page/`)
      })
      .catch((err) => {
        console.log(err)
      })
      // console.log(res.status);
      // console.log("Valeur du cookie jwt_token :", jwt_token);
      // window.location.replace(`/login-page/`);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Navbar className="navbar-absolute" expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames('navbar-toggle d-inline', {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1"/>
                <span className="navbar-toggler-bar bar2"/>
                <span className="navbar-toggler-bar bar3"/>
              </NavbarToggler>
            </div>
            <NavbarBrand onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img
                      alt="..."
                      src={`http://localhost:5000/images/${user.image_user}`}
                      style={{ width: '35px', height: '35px' }}
                    />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block"/>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem
                      className="nav-item"
                      onClick={() => navigate(`/admin/UserDetails/${user._id}`)
                      }
                    >
                      Profile
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Settings</DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li"/>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={() => log()}>
                      Log out
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none"/>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default AdminNavbar
