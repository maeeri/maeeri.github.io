import studyData from "../../data/studies.json";
import Accordion from 'react-bootstrap/Accordion';
import StudyItem from "./StudyItem";

const StudyList = () => {
  return (
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
  );
} 

export default StudyList;