import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import ProjectItem from "./ProjectItem";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const url = "https://api.github.com/users/maeeri/repos";

  useEffect(() => {
    axios.get(url).then((response) => {
      setProjects(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    }
    );
  }, []);
  if (projects.length === 0) {
    return <p>Loading projects...</p>;
  }
  
  return (
    <Accordion>
      {
        projects.map((project) => (
          <Accordion.Item eventKey={project.id} key={project.id} className="mb-3">
            <Accordion.Header>{project.language}: {project.name}</Accordion.Header>
            <Accordion.Body>
              <ProjectItem item={project} />
              </Accordion.Body>
          </Accordion.Item>
        ))
      }
    </Accordion>
  );
}

export default ProjectList;