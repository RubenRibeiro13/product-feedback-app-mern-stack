import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Suggestions from "./pages/Suggestions";
import Roadmap from "./pages/Roadmap";
import FeedbackDetail from "./pages/FeedbackDetail";
import NewFeedback from "./pages/NewFeedback";
import EditFeedback from "./pages/EditFeedback";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />}/>
          <Route path="suggestions" element={<Suggestions />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="feedback-detail/:suggestionId" element={<FeedbackDetail />} />
          <Route path="new-feedback" element={<NewFeedback />} />
          <Route path="edit-feedback/:suggestionId" element={<EditFeedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
