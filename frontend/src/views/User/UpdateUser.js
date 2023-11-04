import React, {useMemo , useEffect} from "react";
import {useState} from "react";
import {updateUser, getUserByID} from "../../Service/apiUser";
// import AddImage from "./examples/addImage";
import {getUserAuth} from "../../Service/apiUser";
import {useParams} from "react-router-dom";

// reactstrap components
import {
    Card, CardHeader, CardBody, CardFooter, CardText, InputGroupAddon, InputGroup, Row, Col,
} from "reactstrap";
import {Button, Container, Form} from "react-bootstrap";
import Cookies from "js-cookie";
// core components

export default function UpdateUser() {
    const param = useParams();

    //cookies
    const jwt_token = Cookies.get("jwt_token");

    const config = useMemo(() => {
        return {
            headers: {
                Authorization: `Bearer ${ jwt_token }`,
            },
        };
    }, [jwt_token]);

    //session
    if (Cookies.get("jwt_token")) {
        const fetchData = async () => {
            try {
                await getUserAuth(config).then((res) => {
                    if (res.data.user.userType === "user") {
                        window.location.replace(`/landing-page/`);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    } else {
        window.location.replace(`/login-page/`);
    }

    // const [image, setImage] = useState();
    // const [croppedImage, setCroppedImage] = useState(null);
    const [User, setUser] = useState({
        username: "", email: "", password: "", first_Name: "", last_Name: "", phoneNumber: "", image_user: "",
    });

    // const handleEvent = (croppedImageUrl, croppedImageBlob) => {
    //     setCroppedImage(croppedImageUrl);
    //     console.log(croppedImage);
    //     setImage(croppedImageBlob);
    //     console.log(croppedImageUrl);
    //     console.log(croppedImageBlob);
    // };

    const handlechange = (e) => {
        setUser({...User, [e.target.name]: e.target.value});
        console.log(User);
    };
    // let formData = new FormData();
    const update = async (e) => {
        // formData.append("username", User.username);
        // formData.append("email", User.email);
        // formData.append("password", User.password);
        // formData.append("first_Name", User.first_Name);
        // formData.append("last_Name", User.last_Name);
        // formData.append("phoneNumber", User.phoneNumber);
        // formData.append("image_user", image, `${ User.username }+.png`);
        const res = await updateUser(User,param.id, config).then(window.location.replace(`/admin/tablesUsers`)).catch((error) => {
            console.log(error.response.data);
        });
        console.log(res.data);
    };
    useEffect(() => {
        const getUser = async (config) => {
            await getUserByID(param.id, config).then((res) => {
                setUser(res.data.user);
                console.log(res.data.user.enabled);
            }).catch((err) => {
                console.log(err);
            });
        };
        getUser(config);

    }, [config, param.id]);
    return (<>
        <div className="content">
            <Container>
                <Row>
                    <Col md="8">
                        <Card>
                            <CardHeader>
                                <h5 className="title">modifer un compte </h5>
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
                                                        <label>SurNom</label>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <Form.Control
                                                    placeholder="Username"
                                                    type="text"
                                                    name="username"
                                                    disabled
                                                    onChange={ (e) => handlechange(e) }
                                                    label="Username"
                                                    aria-label="Username"
                                                    value={User.username}

                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-md-1" md="3">
                                            <Form.Group>
                                                <InputGroup className="input-group-alternative mb-2 mt-2">
                                                    <InputGroupAddon addonType="prepend">
                                                        <label>Nom</label>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <Form.Control
                                                    defaultValue="BenIsamil"
                                                    placeholder="Nom"
                                                    type="text"
                                                    name="first_Name"
                                                    onChange={ (e) => handlechange(e) }
                                                    label="first_Name"
                                                    aria-label="first_Name"
                                                    value={User.first_Name}

                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col className="pr-md-2" md="3">
                                            <Form.Group>
                                                <InputGroup className="input-group-alternative mb-2 mt-2">
                                                    <InputGroupAddon addonType="prepend">
                                                        <label>Prenom</label>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <Form.Control
                                                    defaultValue="Aziz"
                                                    placeholder="Prenom"
                                                    type="text"
                                                    name="last_Name"
                                                    onChange={ (e) => handlechange(e) }
                                                    label="last_Name"
                                                    aria-label="last_Name"
                                                    value={User.last_Name}

                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <Form.Group>
                                                <InputGroup className="input-group-alternative mb-2 mt-2">
                                                    <InputGroupAddon addonType="prepend">
                                                        <label>Email address</label>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <Form.Control
                                                    placeholder="mike@email.com"
                                                    type="text"
                                                    name="email"
                                                    disabled
                                                    onChange={ (e) => handlechange(e) }
                                                    label="Email"
                                                    aria-label="Email"
                                                    value={User.email}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <InputGroup className="input-group-alternative mb-2 mt-2">
                                                    <InputGroupAddon addonType="prepend">
                                                        <label>phoneNumber</label>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <Form.Control
                                                    defaultValue="+216 21 438 447"
                                                    placeholder="phone Number"
                                                    type="number"
                                                    name="phoneNumber"
                                                    onChange={ (e) => handlechange(e) }
                                                    label="phoneNumber"
                                                    aria-label="phoneNumber"
                                                    value={User.phoneNumber}

                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {/*<Row>*/}
                                    {/*    <Col md="12">*/}
                                    {/*        <Form.Group>*/}
                                    {/*            <InputGroup className="input-group-alternative mb-2 mt-2">*/}
                                    {/*                <InputGroupAddon addonType="prepend">*/}
                                    {/*                    <label>Image</label>*/}
                                    {/*                </InputGroupAddon>*/}
                                    {/*            </InputGroup>*/}
                                    {/*            <AddImage*/}
                                    {/*                className="input-group-alternative"*/}
                                    {/*                onEvent={ handleEvent }*/}
                                    {/*                aspect={ 1 / 1 }*/}
                                    {/*                holder={ "add Profile Image" }*/}
                                    {/*                value={`http://localhost:5000/images/${User.image_user}`}*/}

                                    {/*            />*/}
                                    {/*        </Form.Group>*/}
                                    {/*    </Col>*/}
                                    {/*</Row>*/}
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    className="btn-fill"
                                    color="primary"
                                    type="submit"
                                    onClick={ (e) => update(e) }
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
                                        ° cette utilisateur a un role user{ " " }
                                    </h5>
                                    <h5 className="title">
                                        ° password Doit contenir un Maj , Min , chiffre{ " " }
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
    </>);
}
