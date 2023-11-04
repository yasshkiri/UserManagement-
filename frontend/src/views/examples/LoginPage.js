import React, { useMemo } from "react";
import { useState } from "react";
// reactstrap components
import { MdPassword, MdMarkEmailUnread } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Container, Form } from "react-bootstrap";
import {forgetPassword, LoginUser} from "../../Service/apiUser";
import Cookies from "js-cookie";
// core components
import Navbar from "components/Navbars/LoginNavbar";
import Footer from "components/Footer/Footer.js";
import { getUserAuth } from "../../Service/apiUser";
import { useLocation } from "react-router-dom";

export default function LoginPage() {
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

  const location = useLocation();
  const message = new URLSearchParams(location.search).get("message");

  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);

    const interval = setInterval(() => {
    }, 3000);

    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
      clearInterval(interval);
    };
  }, [message]);

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
  const [User, setUser] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
    // console.log(User);
  };
  const Login = async (user) => {
    try {
      const res = await LoginUser(user);
      // console.log(res.data.message);
      // console.log(res.status);
      // const jwt_token = Cookies.get("jwt_token");
      // console.log("Valeur du cookie jwt_token :", jwt_token);
      // console.log(res.data.user.userType);
      if (res.data.user.userType === "admin") {
        window.location.replace(`/admin/tablesUsers`);
      } else {
        window.location.replace(`/landing-page/`);
      }
    } catch (error) {
      if (error.response.data.erreur === "compte desactive" )
      {
        toast("Compte Desactive  !", { position: "top-center" });
      }else if(error.response.data.erreur === "incorrect password" )
      {
        toast("password incorrect  !", { position: "top-center" });
      }else if(error.response.data.erreur === "incorrect email" )
      {
        toast("email incorrect  !", { position: "top-center" });
      }
      // console.log(error.response.data);
    }
  };
  const forget = async (email) => {
    try {
      const res = await forgetPassword(email);
      console.log(res);
      if (res.data.message === "mot de passe modifié avec succès vérifier votre boîte mail") {
        toast("Vérifier votre boîte mail  !", {position: "top-center"});
      }
    }catch (error) {
      if (error.response.data.message === "User not found!" )
      {
        toast("Email n'existe pas !", { position: "top-center" });
      }
    }
  };
  return (
    <>
      <Navbar />
      <ToastContainer />
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
                      <CardTitle tag="h4" className=" mt-3">
                        connexion
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form mt-2">
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
                            <span className="form-check-sign" /> Je confirme que je veux  {" "}{" "}
                            <a
                              href="#pablo"
                              onClick={ (e) => forget(User.email) }
                            >
                             Réinitialiser mon mot de passe
                            </a>
                            .

                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        type="button"
                        onClick={() => Login(User)}
                      >
                        connexion
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
