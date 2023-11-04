import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row, } from 'reactstrap'
import { deleteCompagne, getErrorLogContent } from '../../Service/apiCompagne'
import Cookies from 'js-cookie'
import { getUserAuth } from '../../Service/apiUser'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

function ErrorLog () {
  const navigate = useNavigate()
  const param = useParams()

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

  const [errorLogContent, setErrorLogContent] = useState('')

  const getError = useCallback(async (config) => {
    await getErrorLogContent(config).then((res) => {
      setErrorLogContent(res.data.logContent)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    getError(config)

    const interval = setInterval(() => {
      getError(config)
    }, 1000000)

    return () => clearInterval(interval)
  }, [getError, config])

  const deleteACompagne = async (compagne, config) => {

    deleteCompagne(param.id, config)
  }
  return (
    <>
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
                    Liste des Erreur Compagnes Email
      <pre>{errorLogContent}</pre>

                  </span>
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => {
                      navigate(`/admin/AddCompagne`)
                      deleteACompagne()
                    }}
                  >
                    Corriger tout c'est erreur
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardBody>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ErrorLog
