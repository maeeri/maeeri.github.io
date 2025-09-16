import Appbar from './components/Appbar';
import StudyList from './components/StudyList';
import { Routes, Route } from 'react-router-dom';
import WorkList from './components/WorkList';
import Home from './components/Home';
import ProjectList from './components/ProjectList';

function App() {
  return (
    <div className="App">
      <Appbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='work' element={<WorkList />} />
        <Route path='studies' element={<StudyList />} />
        <Route path='projects' element={<ProjectList />} />
      </Routes>
    </div>
  );
}

export default App;
