import studyData from "../../data/studies.json";
import { Accordion, Container } from 'react-bootstrap';
import StudyItem from "./StudyItem";


const StudyList = () => {
  return (
    <Container className="mt-4">
      <Accordion>
        {
          studyData.map((item) => (
            <Accordion.Item eventKey={item.id} key={item.id} className="mb-3">
              <Accordion.Header>{item.course}</Accordion.Header>
              <Accordion.Body>
                <StudyItem item={item} />
              </Accordion.Body>
            </Accordion.Item>
          ))
        }
      </Accordion>
    </Container>
  );
} 

export default StudyList;