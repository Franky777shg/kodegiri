import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Container, Image } from "react-bootstrap";
import { axiosInstance } from "../api";
import "./jobDetailPage.css";
const url = "http://localhost:2000/job/detail/";

export const JobDetailPage = () => {
  const [job, setJob] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const getJobDetail = async () => {
    try {
      const { data } = await axiosInstance.get(url + params.id);
      setJob(data);
      document.getElementById("desc").innerHTML = data.description;
      document.getElementById("reply").innerHTML = data.how_to_apply;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getJobDetail();
  }, []);

  return (
    <div>
      <Row className="py-4">
        <Col>
          <Button
            style={{
              backgroundColor: "white",
              color: "#427fbe",
              border: "none",
            }}
            onClick={() => navigate("/job")}
          >
            ⬅️ Back
          </Button>
        </Col>
      </Row>
      <Row className="px-4">
        <Row style={{ borderBottom: "1px solid gray" }}>
          <Col className="py-3">
            <span>{job?.type}</span> / <span>{job?.location}</span>
            <h3 style={{ fontWeight: "bold" }}>{job?.title}</h3>
          </Col>
        </Row>
        <Row>
          <Col lg={8} id="desc" className="py-3"></Col>
          <Col className="py-3">
            <Container className="logo-cont mb-5">
              <Row style={{ borderBottom: "1px solid gray" }}>
                <b className="my-2">{job?.company}</b>
              </Row>
              <Row className="py-3 d-flex justify-content-center">
                <Image src={job?.company_logo} style={{ width: "80%" }} />
              </Row>
              <Row>
                <a href={job?.company_url}>{job?.company_url}</a>
              </Row>
            </Container>
            <Container className="reply-cont">
              <Row style={{ borderBottom: "1px solid gray" }}>
                <b className="my-2">How To Apply</b>
              </Row>
              <Row id="reply"></Row>
            </Container>
          </Col>
        </Row>
      </Row>
    </div>
  );
};
