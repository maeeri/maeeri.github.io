import workData from '../../data/work.json';
import WorkItem from './WorkItem';
import { Accordion, Container } from 'react-bootstrap';

const WorkList = () => {
  return (
    <Container className="mt-4">
      <Accordion>
        {
          workData.map((item) => (
            <Accordion.Item eventKey={item.id} key={item.id} className="mb-3">
              <Accordion.Header>{item.title}</Accordion.Header>
              <Accordion.Body>
                <WorkItem item={item} />
              </Accordion.Body>
            </Accordion.Item>
          ))
        }
      </Accordion>
    </Container>
  );
}

export default WorkList;