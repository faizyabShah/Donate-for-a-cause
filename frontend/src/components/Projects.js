import "./Projects.scss";

function Projects({ orgname }) {
  const donations = [
    {
      title: "School Supplies",
      description:
        "Help us provide essential school supplies to underprivileged students in our community.",
      amountRequired: 5000,
      collected: 2850,
    },
    {
      title: "Food Drive",
      description:
        "Support our food drive to help fight hunger in our community.",
      amountRequired: 10000,
      collected: 6500,
    },
    {
      title: "Animal Shelter",
      description:
        "Help us provide care and shelter for abandoned animals in our local shelter.",
      amountRequired: 7500,
      collected: 3500,
    },
  ];
  return (
    <div className="projects">
      <h1>Projects</h1>
      <div className="projectsList">
        {donations.map((donation) => (
          <div className="project">
            <div className="projectTitle">{donation.title}</div>
            <div className="projectDescription">{donation.description}</div>
            <div className="projectAmount">
              <div className="projectAmountRequired">
                <div className="projectAmountRequiredTitle">
                  Amount Required
                </div>
                <div className="projectAmountRequiredAmount">
                  {donation.amountRequired}
                </div>
              </div>
              <div className="projectAmountCollected">
                <div className="projectAmountCollectedTitle">
                  Amount Collected
                </div>
                <div className="projectAmountCollectedAmount">
                  {donation.collected}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
