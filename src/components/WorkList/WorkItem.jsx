import { Accordion, Card } from "react-bootstrap";

const WorkItem = ({ item }) => {
  let company = item.company ? item.company : null;
  let title = item.title ? item.title : null;
  let description = item.description ? item.description : null;
  let duration = item.begin && item.end ? `Duration: ${item.begin} - ${item.end}` : item.begin ? `Duration: ${item.begin} - Present` : item.end ? `Finished: ${item.end}` : null;
  return (
    <Card>
      <Card.Body>
        <Card.Title>{company}</Card.Title>
        { title && <Card.Text>{title}</Card.Text> }
        { duration && <Card.Text>{duration}</Card.Text> }
        { description && <Card.Text>{description}</Card.Text> }
        { item.tech.length > 0 && <Accordion>
          <Accordion.Header>Tech</Accordion.Header>
          {item.tech.map((resp, index) => (
            <Accordion.Body key={index}>{resp}</Accordion.Body>
          ))}
        </Accordion> }
      </Card.Body>
      
    </Card>
  );
}

export default WorkItem;