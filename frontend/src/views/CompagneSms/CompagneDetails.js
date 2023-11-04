import React, { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { getUserAuth } from '../../Service/apiUser'
import { useParams } from 'react-router-dom'
import { SiVerizon, SiVexxhost, } from 'react-icons/si'
import { Card, CardBody, CardText, Col, Row } from 'reactstrap'
import { getCompagneById } from '../../Service/apiCompagneSms'
import moment from 'moment/moment'
import { Table } from 'reactstrap';

function CompagneDetails () {
  const param = useParams()

  const [compagne, setCompagnes] = useState([])

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
  useEffect(() => {
    const getUser = async (config) => {
      await getCompagneById(param.id, config).then((res) => {
        setCompagnes(res.data.Companys)
        console.log(res.data.user.enabled)
      }).catch((err) => {
        console.log(err)
      })
    }
    getUser(config)
    const interval = setInterval(() => {
      getUser(config) // appel répété toutes les 10 secondes
    }, 300000)
    return () => clearInterval(interval) // nettoyage à la fin du cycle de vie du composant
  }, [config, param.id])

  return (<>
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardBody>
              <CardText/>
              <div className="author">
                <div className="block block-one"/>
                <div className="block block-two"/>
                <div className="block block-three"/>
                <div className="block block-four"/>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar"
                    src={`http://localhost:5000/xcl/${compagne.image_Compagne}`}
                  />
                  <h3 className="title">{compagne.nomCompagne}</h3>
                </a>
              </div>
              <a href={`http://localhost:5000/Xcl/${compagne.fichierExcel}`} target="_self"
                 rel="noopener noreferrer">
                {compagne.fichierExcel}
              </a>
              <div className="card-description">Verification : {compagne.validation ? (<SiVerizon
                className="mr-2"
                style={{ fontSize: '24px' }}
              />) : (<SiVexxhost
                className="mr-2"
                style={{ fontSize: '24px' }}
              />)}</div>
              <div className="card-description">
                Cree le : .
                {moment(compagne.createdAt).format('YYYY-MM-DD HH:mm')}
              </div>
              <div className="card-description">
                Modifier le : .
                {moment(compagne.updatedAt).format('YYYY-MM-DD HH:mm')}
              </div>
              <Table striped>
                <thead>
                <tr>
                  <th>Num</th>
                  <th>Continue</th>
                  <th>Date d'envoi</th>
                </tr>
                </thead>
                <tbody>
                {compagne.contacts &&
                  compagne.contacts.map((contact, index) => (
                    <tr key={index}>
                      <td>{contact.num}</td>
                      <td>{contact.content}</td>
                      <td>{moment(contact.dateEnvoi).format('YYYY-MM-DD')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  </>)
}

export default CompagneDetails
