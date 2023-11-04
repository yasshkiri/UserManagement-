import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
} from 'reactstrap'
import {
  active,
  deleteUser,
  desactive,
  downgrade,
  forgetPassword,
  getAdmin,
  getSimpleUser,
  getUserActive,
  getUserAuth,
  getUserDesactive,
  getUsers, searchUsers,
  upgrade,
} from '../../Service/apiUser'
import Cookies from 'js-cookie'
import moment from 'moment'
import { FaUserAltSlash, FaUserCog } from 'react-icons/fa'
import { GiUpgrade, GiWideArrowDunk } from 'react-icons/gi'
import {
  AiFillSetting,
  AiOutlineFieldTime,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineReload,
  AiOutlineUser,
} from 'react-icons/ai'

// import { FaUserCheck, FaUserMinus } from "react-icons/fa";
import { SiCriticalrole, SiVerizon, SiVexxhost } from 'react-icons/si'
import { BiRename, BiShowAlt } from 'react-icons/bi'
import { GoVerified } from 'react-icons/go'
import { MdOutlineDriveFileRenameOutline, MdOutlineLockReset, } from 'react-icons/md'
import { BsImageFill } from 'react-icons/bs'
import { RiAdminFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { FallingLines, Puff, Watch } from 'react-loader-spinner'
import classNames from 'classnames'

function TableListUser () {
  const navigate = useNavigate()

  //cookies
  const jwt_token = Cookies.get('jwt_token')

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  //session
  if (Cookies.get('jwt_token')) {
    const fetchData = async () => {
      try {
        await getUserAuth(config).then((res) => {
          if (res.data.user.userType === 'user') {
            window.location.replace(`/landing-page/`)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  } else {
    window.location.replace(`/login-page/`)
  }

  const getAllUsers = useCallback(async (config) => {
    await getUsers(config).then((res) => {
      setUsers(res.data.users)
      // console.log(res.data.users)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const getAllAdmin = useCallback(async (config) => {
    await getAdmin(config).then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const getAllSimpleUser = useCallback(async (config) => {
    await getSimpleUser(config).then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const getAllUserActive = useCallback(async (config) => {
    await getUserActive(config).then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const getAllUserDesactive = useCallback(async (config) => {
    await getUserDesactive(config).then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const [users, setUsers] = useState([])
  const [deletedUsers, setDeletedUsers] = useState([])

  useEffect(() => {
    getAllUsers(config)

    const interval = setInterval(() => {
      getAllUsers(config)
    }, 1000000)

    return () => clearInterval(interval)
  }, [getAllUsers, config])

  const deleteAuser = async (user, config) => {
    const result = window.confirm('Êtes-vous sûr de vouloir supprimer de la base ? ' + user.username + '?')
    if (result) {
      deleteUser(user._id, config)
      getAllUsers(config)
    } else {
      setDeletedUsers([...deletedUsers, user])
    }
  }

  const forget = async (email) => {
    forgetPassword(email)
  }

  const upgradeAuser = async (user, config) => {
    upgrade(user._id, config)
    setTimeout(() => {
      getAllUsers(config)
    }, 1000) // Appeler getAllUsers(config) après un délai de 2 secondes
  }

  const downgradeAuser = async (user, config) => {
    downgrade(user._id, config)
    setTimeout(() => {
      getAllUsers(config)
    }, 1000) // Appeler getAllUsers(config) après un délai de 2 secondes
  }

  const ActiveCompte = async (user, config) => {
    active(user._id, config)
    setTimeout(() => {
      getAllUsers(config)
    }, 1000) // Appeler getAllUsers(config) après un délai de 2 secondes
  }

  const DesactiveCompte = async (user, config) => {
    desactive(user._id, config)
    setTimeout(() => {
      getAllUsers(config)
    }, 1000) // Appeler getAllUsers(config) après un délai de 2 secondes
  }

  function getFirstTenWords (str) {
    const splittedWord = str.split('@') // Diviser le mot en fonction du caractère "@"
    const firstPart = splittedWord[0] // Récupérer la première partie du mot (avant "@")

    return firstPart
  }

  function getUserTypeAbbreviation (userType) {
    if (userType === 'admin') {
      return (<RiAdminFill
        className="mr-2"
        color="#4fa94d"
        style={{ fontSize: '24px' }}
      />)
    } else if (userType === 'user') {
      return <AiOutlineUser className="mr-2" style={{ fontSize: '24px' }}/>
    } else {
      return '' // Valeur par défaut si le type d'utilisateur n'est ni "admin" ni "user"
    }
  }

  const getsearchUser = useCallback(async (term,config) => {
    await searchUsers(term,config).then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Faites quelque chose avec le terme de recherche (par exemple, effectuez une requête API)
    getsearchUser(searchTerm,config);

    console.log('Recherche effectuée:', searchTerm)
  }

  return (<>
  <div className="content">
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle
              tag="h4"
              className="d-flex justify-content-between align-items-center"
            >
                  <span>
                    Liste des utilisateurs
                    <AiOutlineReload
                      onClick={() => getAllUsers(config)}
                      className="ml-2"
                      style={{ fontSize: '15px' }}
                    />
                    <Puff
                      height="20"
                      width="20"
                      radius={1}
                      color="#4fa94d"
                      ariaLabel="puff-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      onClick={() => getAllUsers(config)}
                    />
                  </span><p> Utilisateurs :</p>
              <Col sm="1" className="ml-4">
                <ButtonGroup
                  className="btn-group-toggle float-right"
                  data-toggle="buttons"
                >
                  <Button
                    tag="label"
                    className={classNames('btn-simple',
                      {})}
                    color="info"
                    id="0"
                    size="sm"
                    onClick={() => getAllAdmin(
                      config)}

                  >
                        <span
                          className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                           Admin
                        </span>
                    <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02"/>
                        </span>
                  </Button>
                  <Button
                    color="info"
                    id="1"
                    size="sm"
                    tag="label"
                    className={classNames('btn-simple',
                      {})}
                    onClick={() => getAllSimpleUser(
                      config)}
                  >
                        <span
                          className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Simple
                        </span>
                    <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2"/>
                        </span>
                  </Button>
                  <Button
                    color="info"
                    id="2"
                    size="sm"
                    tag="label"
                    className={classNames('btn-simple',
                      {})}
                    onClick={() => getAllUserActive(
                      config)}
                  >
                        <span
                          className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                           Verifier
                        </span>
                    <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02"/>
                        </span>
                  </Button>
                  <Button
                    tag="label"
                    className={classNames('btn-simple',
                      {})}
                    color="info"
                    id="0"
                    size="sm"
                    onClick={() => getAllUserDesactive(
                      config)}

                  >
                        <span
                          className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Désactive
                        </span>
                    <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02"/>
                        </span>
                  </Button>
                </ButtonGroup>
              </Col>
              <Button
                color="primary"
                type="button"
                onClick={() => navigate(
                  `/admin/AddUser`)}
              >
                Ajouter un utilisateur
              </Button>
            </CardTitle>
          </CardHeader>
            <form onSubmit={handleSubmit}>

                <Form.Group className="d-flex ml-2 pl-md-1 ">
                  <Col className="px-md-1" md="3">
                  <Form.Control
                    placeholder="Rechercher..."
                    type="text"
                    name="username"
                    value={searchTerm}
                    onChange={handleInputChange}
                    label="Username"
                    aria-label="Username"
                  />
              </Col><Button color="primary" type="submit" >
              Rechercher
            </Button>
            </Form.Group>
          </form>
  <CardBody>
    <Table className="tablesorter" >
      <thead className="text-primary">
      <tr>
        <th>
          Img
          <BsImageFill
            className="ml-2"
            style={{ fontSize: '15px' }}
          />
        </th>
        <th>
          SurNom
          <BiRename
            className="ml-2"
            style={{ fontSize: '15px' }}
          />
        </th>
        <th>
          Nom
          <MdOutlineDriveFileRenameOutline
            className="ml-2"
            style={{ fontSize: '15px' }}
          />
        </th>
        <th>
          Prenom
          <MdOutlineDriveFileRenameOutline
            className="ml-2"
            style={{ fontSize: '15px' }}
          />
        </th>
        <th>
          Email
          <AiOutlineMail
            className="ml-2"
            style={{ fontSize: '15px' }}
          />
        </th>
        <th>Cree_At
          <AiOutlineFieldTime
            className="ml-2"
            style={{ fontSize: '15px' }}
          /></th>

        <th>
          Modifier_AT
          <AiOutlineFieldTime
            className="ml-2"
            style={{ fontSize: '15px' }}
          />
        </th>
        <th>
          Role
          <SiCriticalrole
            className="ml-2"
            style={{ fontSize: '15px' }}
          />
        </th>
        <th>
          Verif
          <GoVerified
            className="ml-2"
            style={{ fontSize: '15px' }}
          />
        </th>
        <th>
          tel
          <AiOutlinePhone
            className="ml-2"
            style={{ fontSize: '15px' }}
          />
        </th>
        <th>
          Action
          <AiFillSetting
            className="ml-2"
            style={{ fontSize: '15px' }}
          />
        </th>
      </tr>
      </thead>
      <tbody responsive="true">
      {users.filter((user) => !deletedUsers.includes(user)).map((user) => (
        <tr key={user._id}>
          <td className="align-items-center">
            <a
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <img onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                   alt="..."
                   src={`http://localhost:5000/images/${user.image_user}`}
                   style={{ width: '80px', height: '80px' }}
              />
            </a>
          </td>
          <td>
            {user.username ? (user.username) : (<SiVexxhost
              className="mr-2"
              style={{ fontSize: '24px' }}
            />)}
          </td>
          <td>
            {user.first_Name ? (user.first_Name) : (<SiVexxhost
              className="mr-2"
              style={{ fontSize: '24px' }}
            />)}
          </td>
          <td>
            {user.last_Name ? (user.last_Name) : (<SiVexxhost
              className="mr-2"
              style={{ fontSize: '24px' }}
            />)}
          </td>
          <td>
            <a href={`/admin/UserDetails/${user._id}`}>
              {getFirstTenWords(user.email)}
              <i className="fa fa-sort-desc" aria-hidden="true"></i>
            </a>
          </td>
          <td>
            <Watch
              className="ml-2"
              height="20"
              width="20"
              color="#4fa94d"
              ariaLabel="watch-loading"
              visible={true}
            />
            {moment(user.createdAt).format('YYYY-MM-DD HH:mm')}{' '}
          </td>
          <td>
            <Watch
              className="ml-2"
              height="20"
              width="20"
              color="#4fa94d"
              ariaLabel="watch-loading"
              visible={true}
            />{' '}
            {moment(user.updatedAt).format('YYYY-MM-DD HH:mm')}{' '}
          </td>
          <td>{getUserTypeAbbreviation(user.userType)}</td>
          <td>
            {user.enabled ? (<SiVerizon
              className="mr-2"
              color="#4fa94d"
              style={{ fontSize: '24px' }}
            />) : (<SiVexxhost
              className="mr-2"
              style={{ fontSize: '24px' }}
            />)}
          </td>
          <td>
            {user.phoneNumber ? (user.phoneNumber) : (<SiVexxhost
              className="mr-2"
              style={{ fontSize: '24px' }}
            />)}
          </td>
          <td className="text-right">
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                href="#pablo"
                role="button"
                size="sm"
                color=""
                onClick={(e) => e.preventDefault()}
              >
                <FallingLines
                  color="#00000"
                  width="25"
                  visible={true}
                  ariaLabel="falling-lines-loading"
                />
              </DropdownToggle>
              <DropdownMenu
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem
                  onClick={() => deleteAuser(user, config)}
                >
                  <FaUserAltSlash
                    className=" mr-2"
                    style={{ fontSize: '20px' }}
                  />
                  Supprimer
                </DropdownItem>
                <DropdownItem
                  onClick={() => navigate(`/admin/UpdateUser/${user._id}`)}
                  // onClick={(e) => Modifier(user)}
                >
                  <FaUserCog
                    className=" mr-2"
                    style={{ fontSize: '20px' }}
                  />
                  Modifier
                </DropdownItem>
                {user.userType === 'user' ? (<DropdownItem
                  onClick={() => upgradeAuser(user, config)}
                >
                  <GiUpgrade
                    className="mr-2"
                    style={{ fontSize: '20px' }}
                  />
                  mise à niveau vers administrateur
                </DropdownItem>) : (<DropdownItem
                  onClick={() => downgradeAuser(user, config)}
                >
                  <GiWideArrowDunk
                    className="mr-2"
                    style={{ fontSize: '20px' }}
                  />
                  mise à niveau vers un simple utilisateur
                </DropdownItem>)}
                {user.enabled === false ? (<DropdownItem
                  href=""
                  onClick={() => ActiveCompte(user, config)}
                >
                  <SiVerizon
                    className="mr-2"
                    style={{ fontSize: '20px' }}
                  />
                  Active Un Compte
                </DropdownItem>) : (<DropdownItem
                  onClick={() => DesactiveCompte(user, config)}
                >
                  <SiVexxhost
                    className="mr-2"
                    style={{ fontSize: '20px' }}
                  />
                  Desactive Un Compte
                </DropdownItem>)}

                <DropdownItem
                  onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                >
                  <BiShowAlt
                    className=" mr-2"
                    style={{ fontSize: '20px' }}
                  />
                  Details
                </DropdownItem>

                <DropdownItem
                  onClick={() => forget(user.email)}
                >
                  <MdOutlineLockReset
                    className=" mr-2"
                    style={{ fontSize: '20px' }}
                  />
                  Reset Password
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>))}
      </tbody>
    </Table>
  </CardBody>
  </Card>
</Col>
</Row>
</div>
</>)
}

export default TableListUser
