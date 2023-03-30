import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Suggestions from "./pages/Suggestions";
import NewFeedback from "./pages/NewFeedback";
import Roadmap from "./pages/Roadmap";
import FeedbackDetail from "./pages/FeedbackDetail";
import EditFeedback from "./pages/EditFeedback";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}/>

            <Route path="suggestions">
              <Route index element={<Suggestions />} />
            </Route>

            <Route path="roadmap">
              <Route index element={<Roadmap />} />
            </Route>

            <Route path="feedback-detail">
              <Route path=":suggestionId" element={<FeedbackDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <h1>Hello world!</h1>
      <Header />
      <BrowserRouter>
        <Header />

        <Routes>
          <Route
            path="/suggestions"
            element={<Suggestions />}
          />

          <Route
            path="/suggestions/new-feedback"
            element={<NewFeedback />}
          />

          <Route
            path="/roadmap"
            element={<Roadmap />}
          />

          <Route
            path="/feedback-detail/:suggestionId"
            element={<FeedbackDetail />}
          />

          <Route
            path="/feedback-detail/edit-feedback/:suggestionId"
            element={<EditFeedback />}
          />
        </Routes>

        <Footer />
      </BrowserRouter> */}
    </div>
  );
}

export default App;
