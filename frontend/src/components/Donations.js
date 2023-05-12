import React from "react";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/userContextHook";

const Donations = () => {
  const [projects, setProjects] = useState([]);
  const { token, user } = useUserContext();
  useEffect(() => {
    const fetchProjects = async () => {
      const url = "http://localhost:5000/api/projects/user/";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setProjects(data);
    };
    if (user) {
      fetchProjects();
    }
  }, [user]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Project</th>
          <th>Organization</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {projects != null
          ? projects.map((project) =>
              project.donations.map(
                (donation) =>
                  donation.user_id === user._id && (
                    <tr key={donation._id}>
                      <td>{project.name}</td>
                      <td>{project.organization.name}</td>
                      <td>{donation.amount}</td>
                      <td>
                        {
                          //get date and time from timestamp
                          new Date(donation.timestamp).toLocaleString()
                        }
                      </td>
                    </tr>
                  )
              )
            )
          : null}
      </tbody>
    </Table>
  );
};

export default Donations;
