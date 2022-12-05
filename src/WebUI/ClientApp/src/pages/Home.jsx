import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DataTable from "components/DataTable";

import api from "services/api";

function Home() {
  const [issues, setIssues] = useState([]);
  const [projects, setProjects] = useState([]);

  const columns = [
    {
      label: "Reporter",
      render: ({ reporter }) => `${reporter.firstName} ${reporter.lastName}`,
    },
    {
      label: "Created",
      render: ({ createdAt }) => new Date(createdAt).toDateString(),
    },
    {
      label: "Project",
      render: ({ project }) => `${project.name}`,
    },
    {
      label: "Priority",
      field: "priority",
    },
    {
      label: "Summary",
      render: ({ id, summary }) => (
        <Link to={`/issues/${id}`}>{`${summary}`}</Link>
      ),
    }
  ];

  const dateDiffFromNow = (date) => {
    const curr = new Date();
    const diff = date - curr;
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const fetchIssues = async () => {
    const response = await api.get("api/issues");
    const data = response.data;
    setIssues(data);
  };

  const fetchProjects = async () => {
    const response = await api.get("api/projects");
    const data = response.data;
    setProjects(data);
  };

  const renderRecentOpenIssuesTable = (issues) => {
    const data = issues?.filter(
      (value) => dateDiffFromNow(new Date(value.createdAt)) <= 7 && value.status === "Open"
    );
    return <DataTable columns={columns} dataSource={data} />;
  };

  const renderUnassignedIssuesTable = (issues) => {
    const data = issues?.filter((value) => value.assigneeId === null);
    return <DataTable columns={columns} dataSource={data} />;
  };

  useEffect(() => {
    fetchIssues();
    fetchProjects();
  }, []);

  return (
    <>
      <div className="">
        <h4>Recently Opened Issues</h4>
        {renderRecentOpenIssuesTable(issues)}
      </div>
      <div className="">
        <h4>Unassigned Issues</h4>
        {renderUnassignedIssuesTable(issues)}
      </div>
    </>
  );
}

export default Home;
