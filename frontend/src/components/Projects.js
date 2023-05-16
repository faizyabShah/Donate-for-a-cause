import AddDonationModal from "./AddDonationModal";
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/userContextHook";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { Doughnut } from "react-chartjs-2";
import Loader from "./Loader";
import "./Projects.scss";

function Projects({ org, projects, handleDonate }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(0);
  const [i, setI] = useState();
  const { user } = useUserContext();
  const [showDetails, setShowDetails] = useState([]);

  const handleShut = () => {
    setShowModal(false);
    setError(null);
  };

  const handleModalClose = () => {
    if (amount <= 0) {
      setError("Invalid amount");
      return;
    } else if (amount > user.wallet) {
      setError("Not enough money in wallet.");
      return;
    }
    setError(null);
    handleDonate(i, amount);
    setShowModal(false);
  };

  const something = (e) => {
    const index = e.target.getAttribute("data-index");
    setShowModal(true);
    setI(index);
  };

  const closeModaltwo = () => {
    setShowDetails(false);
  };

  const somethingtwo = (e) => {
    const index = e.target.getAttribute("data-index");
    let arr = [...showDetails];
    arr[index] = true;
    setShowDetails(arr);
  };

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < projects.length; i++) {
      arr.push(false);
    }
    setShowDetails(arr);
  }, [projects]);

  const somethingthree = (i) => {
    let arr = [...showDetails];
    arr[i] = false;
    setShowDetails(arr);
  };

  const chartData = {
    labels: ["Label 1", "Label 2", "Label 3"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="projects">
      <h1>Projects</h1>
      <div className="projectsList">
        {projects.length != 0 ? (
          projects.map((project, i) =>
            project.organization == org ? (
              <Card className="project">
                <Card.Body>
                  <Card.Img
                    className="projectImage"
                    variant="top"
                    src={project.Picture}
                  />
                  <Card.Title className="projectTitle">
                    {project.name}
                  </Card.Title>

                  <Link
                    className="details"
                    data-index={i}
                    onClick={somethingtwo}
                  >
                    details
                  </Link>
                  <div className="donut">
                    <Doughnut
                      data={{
                        labels: ["Collected", "Remaining"],
                        datasets: [
                          {
                            data: [
                              project.amount_raised,
                              project.cost - project.amount_raised,
                            ],
                            backgroundColor: ["#FF6384", "#36A2EB"],
                            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                          },
                        ],
                      }}
                    />
                  </div>
                  {/* <Card.Text className="projectDescription">
                      {project.description}
                    </Card.Text> */}

                  <Button
                    className="donateButton"
                    onClick={(e) => something(e)}
                    data-index={i}
                    disabled={project.amount_raised >= project.cost}
                  >
                    Donate
                  </Button>
                </Card.Body>
                {showDetails[i] ? (
                  <ProjectDetailsModal
                    i={i}
                    somethingthree={somethingthree}
                    handleClose={closeModaltwo}
                    handleShut={closeModaltwo}
                    project={project}
                  />
                ) : null}
              </Card>
            ) : null
          )
        ) : (
          <Loader />
        )}
        {showModal ? (
          <AddDonationModal
            index={i}
            handleClose={handleModalClose}
            handleShut={handleShut}
            setAmount={setAmount}
            error={error}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Projects;
