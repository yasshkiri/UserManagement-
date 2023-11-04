import React, { useMemo } from "react";
import { useState } from "react";
import { AiOutlineUser, AiOutlineLogin } from "react-icons/ai";
import { MdPassword, MdMarkEmailUnread } from "react-icons/md";
import { register } from "../../Service/apiUser";
import AddImage from "./addImage";
import { getUserAuth } from "../../Service/apiUser";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  FormGroup,
  Col,
} from "reactstrap";
import { Button, Container, Form } from "react-bootstrap";
import Cookies from "js-cookie";
// core components
import Navbar from "components/Navbars/Navbar";
import Footer from "components/Footer/Footer.js";

export default function RegisterPage() {
  //cookies
  const jwt_token = Cookies.get("jwt_token");

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  //session
  if (Cookies.get("jwt_token")) {
    const fetchData = async () => {
      try {
        await getUserAuth(config).then((res) => {
          if (res.data.user.userType === "admin") {
            window.location.replace(`/admin/`);
          }
          if (res.data.user.userType === "user") {
            window.location.replace(`/landing-page/`);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }

  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState(null);
  const [User, setUser] = useState({
    username: "",
    email: "",
    password: "",
    image_user: "",
  });
  const handleEvent = (croppedImageUrl, croppedImageBlob) => {
    setCroppedImage(croppedImageUrl);
    console.log(croppedImage);
    setImage(croppedImageBlob);
    console.log(croppedImageUrl);
    console.log(croppedImageBlob);
  };
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");

  const handlechange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
    console.log(User);
  };
  let formData = new FormData();
  const add = async (e) => {
    formData.append("username", User.username);
    formData.append("email", User.email);
    formData.append("password", User.password);
    formData.append("image_user", image, `${User.username}+.png`);
    const res = await register(formData)
      .then(window.location.replace(`/login-page/`))
      .catch((error) => {
        console.log(error.response.data);
      });
    console.log(res.data);
  };
  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
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
                        </FormGroup>
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
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
