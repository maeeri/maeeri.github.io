import { Card } from 'react-bootstrap';
const ProjectItem = ({ item }) => {
  let name = item.name ? item.name.replaceAll("-", " ") : "";
  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Card.Text>Language: {item.language}</Card.Text>
        <Card.Text>Created: {new Date(item.created_at).toLocaleDateString()}</Card.Text>
        <Card.Text>Last Updated: {new Date(item.updated_at).toLocaleDateString()}</Card.Text>
        <Card.Link href={item.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</Card.Link>
      </Card.Body>
    </Card>
  );
}
export default ProjectItem;