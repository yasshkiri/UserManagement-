import React, { useMemo, useState } from 'react'
import { getUserAuth } from '../../Service/apiUser'
import { AddCompagneService } from '../../Service/apiCompagne'

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
    if(res.data.hasErrors === 0)
    {
      window.location.replace(`/admin/TableListCompagne`)
    }else {
      window.location.replace(`/admin/ErrorLog/${res.data.company._id}`)
    }
  }
  React.useEffect(() => {
    document.body.classList.toggle('register-page')
    // Specify how to clean up after this effect:
    return function cleanup () {
      document.body.classList.toggle('register-page')
    }
  }, [])
  const isButtonDisabled = !(image && xcl); // Vérifier si les champs image et xcl sont remplis

  return (<>
    <div className="content">
      <Container>
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Ajouter un Compagne Email</h5>
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
        {/* <Row>
                <Col className="offset-lg-0 offset-md-2 ml-5" lg="5" md="6">
                  <div
                    className="square square-7 mr-2"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register ">
                    <CardHeader>
                      <CardImg
                        className="mt-1"
                        alt="..."
                        src={require("assets/img/square-purple-2.png")}
                      />
                      <CardTitle tag="h4" className="ml-2 mt-3">
                        s'inscrire
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form
                        className="form mt-2"
                        role="form"
                        encType="multipart/form-data"
                      >
                        <Form.Group>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <AiOutlineUser />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              placeholder="Username"
                              type="text"
                              name="username"
                              onChange={(e) => handlechange(e)}
                              label="Username"
                              aria-label="Username"
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <MdMarkEmailUnread />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              placeholder="Email Address"
                              type="text"
                              name="email"
                              onChange={(e) => handlechange(e)}
                              label="Email"
                              aria-label="Email"
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <MdPassword />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              placeholder="Password"
                              type="text"
                              name="password"
                              onChange={(e) => handlechange(e)}
                              label="Password"
                              aria-label="Password"
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText></InputGroupText>
                            </InputGroupAddon>
                            <AddImage
                              className="input-group-alternative"
                              onEvent={handleEvent}
                              aspect={1 / 1}
                              holder={"add Profile Image"}
                            />
                          </InputGroup>
                        </Form.Group>
                        <FormGroup check className="text-left">
                          <Label check>
                            <Input type="checkbox" />
                            <span className="form-check-sign" />I agree to the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              terms and conditions
                            </a>
                            .
                          </Label>
                        </Form.Group>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        size="lg"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom left, #edae3c, #dc5949, #344675)",
                        }}
                        onClick={(e) => add(e)}
                      >
                        <AiOutlineLogin className=" mr-2" />
                        Commencer
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row> */}
        <div className="register-bg"/>
      </Container>
    </div>
  </>)
}
