import React, { useMemo, useState } from 'react'
import { getUserAuth } from '../../Service/apiUser'
import { AddCompagneService } from '../../Service/apiCompagneSms'

// reactstrap components
import { Card, CardBody, CardFooter, CardHeader, CardText, Col, InputGroup, InputGroupAddon, Row, } from 'reactstrap'
import { Button, Container, Form } from 'react-bootstrap'
import Cookies from 'js-cookie'
// core components

export default function AddCompagne () {
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

  const [image, setImage] = useState()
  const [xcl, setxcl] = useState()
  const [compagnes, setCompagnes] = useState(
    {
      nomCompagne: '', fichierExcel: '', image_Compagne: ''
    }
  )

  const handlechangeImage = (e) => {
    setImage(e.target.files[0])
    // console.log(e.target.files[0])
  }
  const handlechangeFile = (e) => {
    setxcl(e.target.files[0])
    // console.log(e.target.files[0])
  }
  const handlechange = (e) => {
    setCompagnes({ ...compagnes, [e.target.name]: e.target.value })
    // console.log(compagnes)
  }
  let formData = new FormData()
  const add = async (e) => {
    formData.append('companyName', compagnes.nomCompagne)
    formData.append('excelFile', xcl)
    formData.append('image_Compagne', image)
    const res = await AddCompagneService(formData, config)
    .then(
      // window.location.replace(`/admin/TableListCompagne`)
    )
    .catch((error) => {
      console.log(error.response.data)
    })
    if (res.data.hasErrors === 0) {
      window.location.replace(`/admin/TableListCompagneSms`)
    } else {
      window.location.replace(`/admin/ErrorLogSms/${res.data.company._id}`)
    }
  }
  React.useEffect(() => {
    document.body.classList.toggle('register-page')
    // Specify how to clean up after this effect:
    return function cleanup () {
      document.body.classList.toggle('register-page')
    }
  }, [])
  const isButtonDisabled = !(image && xcl) // Vérifier si les champs image et xcl sont remplis

  return (<>
    <div className="content">
      <Container>
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Ajouter un Compagne Sms</h5>
              </CardHeader>
              <CardBody>
                <Form
                  className="form mt-2"
                  role="form"
                  encType="multipart/form-data"
                >
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <Form.Group>
                        <InputGroup className="input-group-alternative mb-2 mt-2">
                          <InputGroupAddon addonType="prepend">
                            <label>NomCompagne</label>
                          </InputGroupAddon>
                        </InputGroup>
                        <Form.Control
                          placeholder="nomCompagne"
                          type="text"
                          name="nomCompagne"
                          onChange={(e) => handlechange(e)}
                          label="Username"
                          aria-label="Username"
                        />
                      </Form.Group>
                    </Col>
                  </Row><Row>
                  <Col md="12">
                    <Form.Group>
                      <Form.Label>image :</Form.Label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlechangeImage(e)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <Form.Label>XCL :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                          </InputGroupAddon>
                          <Form.Control
                            type="file"
                            onChange={(e) => handlechangeFile(e)}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={(e) => add(e)}
                  disabled={isButtonDisabled}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText/>
                <div className="author">
                  <div className="block block-one"/>
                  <div className="block block-four"/>
                  <h5 className="title">° SurNom Doit etre unique </h5>
                  <h5 className="title">° Email Doit etre unique </h5>
                  <h5 className="title">
                    ° cette utilisateur a un role user{' '}
                  </h5>
                  <h5 className="title">
                    ° password Doit contenir un Maj , Min , chiffre{' '}
                  </h5>
                  <h5 className="title">° SurNom Doit etre unique </h5>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="register-bg"/>
      </Container>
    </div>
  </>)
}
