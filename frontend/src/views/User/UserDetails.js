import React, {useMemo} from "react";
import Cookies from "js-cookie";
import {useState, useEffect} from "react";
import {getUserAuth} from "../../Service/apiUser";
import {useParams} from "react-router-dom";
import {SiVerizon, SiVexxhost,} from "react-icons/si";
import {Card, CardBody, CardText, Row, Col} from "reactstrap";
import {getUserByID} from "../../Service/apiUser";

function UserDetails() {
    const param = useParams();

    const [user, setUser] = useState([]);
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
        const interval = setInterval(() => {
            getUser(config); // appel répété toutes les 10 secondes
        }, 300000);
        return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
    }, [config, param.id]);

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
                                <a href="#pablo" onClick={ (e) => e.preventDefault() }>
                                    <img
                                        alt="..."
                                        className="avatar"
                                        src={ `http://localhost:5000/images/${ user.image_user }` }
                                    />
                                    <h3 className="title">{ user.username }</h3>
                                </a>
                                <p className="description">{ user.userType }</p>
                            </div>
                            <div className="card-description">Email : { user.email }</div>
                            <div className="card-description">enabled : { user.enabled ? (<SiVerizon
                                className="mr-2"
                                style={ {fontSize: "24px"} }
                            />) : (<SiVexxhost
                                className="mr-2"
                                style={ {fontSize: "24px"} }
                            />) }</div>
                            <div className="card-description">
                                cree le : { user.createdAt }
                            </div>
                            <div className="card-description">
                                modifier le : { user.updatedAt }
                            </div>
                            <div className="card-description">{ user.phoneNumber }</div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    </>);
}

export default UserDetails;
