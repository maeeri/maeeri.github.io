import { Card, ListGroup } from 'react-bootstrap';


const StudyItem = ({ item }) => {
  let school = item.school ? item.school : null;
  let course = item.course ? `Course: ${item.course}` : null;
  let ects = item.ECTS? `Credits: ${item.ECTS} ECTS` : null;
  let duration = item.begin && item.end ? `Duration: ${item.begin} - ${item.end}` : item.begin ? `Duration: ${item.begin} - Present` : item.end ? `Finished: ${item.end}` : null;
  return (
    <Card className="p-3">
      <Card.Body>  
        {school && <Card.Title>{school}</Card.Title> }
        <ListGroup>
          {course && <ListGroup.Item key={item.id} className="mb-3">
            {course}
          </ListGroup.Item> } 
          { ects && <ListGroup.Item key={item.id} className="mb-3">
            {ects}
          </ListGroup.Item> }
          { duration && <ListGroup.Item key={item.id} className="mb-3">
            {duration}
          </ListGroup.Item>}
          {item.website && <ListGroup.Item key={item.id} className="mb-3">
            <Card.Link href={item.website} target="_blank" rel="noopener noreferrer">{ item.website }</Card.Link>
          </ListGroup.Item>}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default StudyItem;