import { useEffect, useState, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./JobPage.css";
import { axiosInstance } from "../api";
const url = "http://localhost:2000/job/all";

export const JobPage = () => {
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const desc = useRef("");
  const loc = useRef("");
  const ft = useRef();
  const navigate = useNavigate();

  const getJobs = async () => {
    try {
      const { data } = await axiosInstance.get(url, {
        params: {
          page,
        },
      });
      setJobs(data);
    } catch (err) {
      console.log(err);
    }
  };

  const moreJobs = async () => {
    try {
      const description = desc.current.value;
      const location = loc.current.value;
      const full_time = ft.current.checked;
      const { data } = await axiosInstance.get(url, {
        params: {
          description,
          location,
          full_time,
          page: page + 1,
        },
      });
      const tempJobs = [...jobs, ...data];
      setJobs(tempJobs);
      setPage(page + 1);
    } catch (err) {
      console.log(err);
      alert("No more jobs!");
    }
  };

  const searchJobs = async () => {
    try {
      const description = desc.current.value;
      const location = loc.current.value;
      const full_time = ft.current.checked;
      const { data } = await axiosInstance.get(url, {
        params: {
          description,
          location,
          full_time,
          page: 1,
        },
      });
      setJobs(data);
      setPage(1);
    } catch (err) {
      console.log(err);
      alert("No more jobs!");
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const compareDate = (input) => {
    const jobPostingDateMs = Date.parse(input);
    const now = Date.now();

    const daysDif = Math.floor(
      (now - jobPostingDateMs) / (24 * 60 * 60 * 1000)
    );

    if (daysDif <= 14) {
      return `${daysDif} day ago`;
    } else if (daysDif <= 21) {
      return `About 3 weeks ago`;
    } else if (daysDif <= 28) {
      return `About 4 weeks ago`;
    } else if (daysDif <= 35) {
      return `About 1 month ago`;
    } else if (daysDif <= 360) {
      return `About ${Math.round(daysDif / 30)} month ago`;
    } else if (daysDif <= 720) {
      return `About 1 year ago`;
    }
  };

  return (
    <div>
      <Row className="row-search px-3">
        <Col lg={5} className="fieldSearch">
          <Form.Group className="" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: "bold" }}>
              Job Description
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="🗒️ Filter by title, benefits, companies, expertise"
              ref={desc}
            />
          </Form.Group>
        </Col>
        <Col lg={5} className="fieldSearch">
          <Form.Group className="" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: "bold" }}>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="🌎 Filter by city, state, zip code or country"
              ref={loc}
            />
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-center gap-3 fieldSearch">
          <Form.Check
            type="checkbox"
            label="Full Time Only"
            style={{ fontWeight: "bold" }}
            ref={ft}
          />
          <Button variant="secondary" onClick={searchJobs}>
            Search
          </Button>
        </Col>
      </Row>
      <Row className="row-data px-5">
        <h1 className="my-4">Job List</h1>
        {jobs.map((item, index) => {
          if (item) {
            return (
              <Row
                className="job"
                key={index}
                onClick={() => navigate(`/detail/${item.id}`)}
              >
                <Col className="d-flex justify-content-center flex-column">
                  <b style={{ marginBottom: 0, color: "#427fbe" }}>
                    {item.title}
                  </b>
                  <p style={{ color: "gray" }}>
                    {item.company} -{" "}
                    <b style={{ color: "green" }}>{item.type}</b>
                  </p>
                </Col>
                <Col
                  className="d-flex justify-content-center flex-column"
                  style={{ textAlign: "right" }}
                >
                  <p style={{ marginBottom: 0 }}>{item.location}</p>
                  <p style={{ color: "gray" }}>
                    {compareDate(item.created_at)}
                  </p>
                </Col>
              </Row>
            );
          }
          return null;
        })}
        <Button className="mb-5" onClick={moreJobs}>
          More Jobs
        </Button>
      </Row>
    </div>
  );
};
