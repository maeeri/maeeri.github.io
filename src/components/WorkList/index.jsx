import workData from '../../data/work.json';
import WorkItem from './WorkItem';
import Accordion from 'react-bootstrap/Accordion';

const WorkList = () => {
    return (
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
  );
}

export default WorkList;