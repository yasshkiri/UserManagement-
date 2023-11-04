import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
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
import { getUserAuth, } from '../../Service/apiUser'
import { deleteCompagne, getCompagne, ValidateCompagneById } from '../../Service/apiCompagne'
import Cookies from 'js-cookie'
import { FaUserAltSlash } from 'react-icons/fa'
import { GrValidate } from 'react-icons/gr'
import { AiFillSetting, AiOutlineFieldTime, AiOutlineReload, } from 'react-icons/ai'
import { BiRename, BiShowAlt } from 'react-icons/bi'
import { BsImageFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FallingLines, Puff, Watch } from 'react-loader-spinner'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment'

function TableListCompagne () {
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

  const getAllCompagne = useCallback(async (config) => {
    await getCompagne(config).then((res) => {
      setCompagnes(res.data.Companys)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const [compagnes, setCompagnes] = useState([])

  useEffect(() => {
    getAllCompagne(config)

    const interval = setInterval(() => {
      getAllCompagne(config)
    }, 1000000)

    return () => clearInterval(interval)
  }, [getAllCompagne, config])

  const deleteACompagne = async (compagne, config) => {
    const result = window.confirm('Êtes-vous sûr de vouloir supprimer de la base ? ' + compagne.nomCompagne + '?')
    if (result) {
      deleteCompagne(compagne._id, config)
    }
    getAllCompagne(config)
  }

  const ValidateCompagne = async (compagne, config) => {
    try {
      await ValidateCompagneById(compagne._id, config)
      navigate(`/admin/CompagneDetails/${compagne._id}`)
      getAllCompagne(config)
    } catch (error) {
      if (error.response.data.message.substring(0, 15) === 'DejaVerifier') {
        toast('Deja Verifier !', { position: 'top-center' })
      } else if (error.response.data.message.substring(0, 17) === 'DateEnvoiInvalide') {
        toast(`${error.response.data.message}   !`, { position: 'top-center' })
      } else if (error.response.data.message.substring(0, 12) === 'EmailInvalid') {
        toast(`${error.response.data.message}   !`, { position: 'top-center' })
      }
    }
  }
  return (<>
    <div className="content">
      <Row>
        <Col md="12">
          <Card>    <ToastContainer />

            <CardHeader>
              <CardTitle
                tag="h4"
                className="d-flex justify-content-between align-items-center"
              >
                  <span>
                    Liste des Compagnes Email
                    <AiOutlineReload
                      onClick={() => getAllCompagne(config)}
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
                      onClick={() => getAllCompagne(config)}
                    />
                  </span>
                <Button
                  color="primary"
                  type="button"
                  onClick={() => navigate(
                    `/admin/AddCompagne`)}
                >
                  Ajouter un Compagne Email
                </Button>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter">
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
                    NomCompagne
                    <BiRename
                      className="ml-2"
                      style={{ fontSize: '15px' }}
                    />
                  </th>        <th>Cree_At
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
                    Excel
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
                {compagnes.map((compagne) => (
                  <tr key={compagne._id}>
                    <td className="align-items-center">
                      <a
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <img onClick={() => navigate(`/admin/CompagneDetails/${compagne._id}`)}
                             alt="..."
                             src={`http://localhost:5000/Xcl/${compagne.image_Compagne}`}
                             style={{ width: '80px', height: '80px' }}
                        />
                      </a>
                    </td>
                    <td>
                      {compagne.nomCompagne}
                    </td>
                    <td>                      <Watch
                      className="ml-2"
                      height="20"
                      width="20"
                      color="#4fa94d"
                      ariaLabel="watch-loading"
                      visible={true}
                    />
                      {moment(compagne.createdAt).format('YYYY-MM-DD HH:mm')}{' '}
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
                      {moment(compagne.updatedAt).format('YYYY-MM-DD HH:mm')}{' '}
                    </td>
                    <td>
                      <a href={`http://localhost:5000/Xcl/${compagne.fichierExcel}`} target="_self"
                         rel="noopener noreferrer">
                        {compagne.fichierExcel}
                      </a>
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
                            onClick={() => deleteACompagne(compagne, config)}
                          >
                            <FaUserAltSlash
                              className=" mr-2"
                              style={{ fontSize: '20px' }}
                            />
                            Supprimer
                          </DropdownItem>
                          <DropdownItem
                            // onClick={() => navigate(`/admin/UpdateUser/${user._id}`)}
                            onClick={(e) => ValidateCompagne(compagne, config)}
                          >
                            <GrValidate
                              className=" mr-2"
                              style={{ fontSize: '20px' }}
                            />
                            Verifier
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => navigate(`/admin/CompagneDetails/${compagne._id}`)}
                          >
                            <BiShowAlt
                              className=" mr-2"
                              style={{ fontSize: '20px' }}
                            />
                            Details
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

export default TableListCompagne
