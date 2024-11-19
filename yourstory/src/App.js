import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";

// 메인 페이지들
import Home from "./pages/Home";
import Volunteer from "./pages/Volunteer";
import Library from "./pages/Library";
import Story from "./pages/Story";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";

// 봉사활동 관련 서브페이지들
import VolunteerList from "./pages/volunteer/VolunteerList";
import VolunteerDetail from "./pages/volunteer/VolunteerDetail";
import VolunteerStatus from "./pages/volunteer/VolunteerStatus";
import VolunteerDiary from "./pages/volunteer/VolunteerDiary";

// 도서관 관련 서브페이지들
import BookDetail from "./pages/library/BookDetail";
import BookViewer from "./pages/library/BookViewer";
import LetterBox from "./pages/library/LetterBox";
import WriteLetter from "./pages/library/WriteLetter";

function App() {
  return (
    <Router>
      <Routes>
        {/* 인증 관련 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 메인 레이아웃 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* 봉사활동 */}
          <Route path="/volunteer">
            <Route index element={<Volunteer />} />
            <Route path="list" element={<VolunteerList />} />
            <Route path=":id" element={<VolunteerDetail />} />
            <Route path="status" element={<VolunteerStatus />} />
            <Route path="diary" element={<VolunteerDiary />} />
          </Route>

          {/* 이타적 도서관 */}
          <Route path="/library">
            <Route index element={<Library />} />
            <Route path="book/:id" element={<BookDetail />} />
            <Route path="book/:id/read" element={<BookViewer />} />
            <Route path="book/:id/letters" element={<LetterBox />} />
            <Route path="book/:id/write-letter" element={<WriteLetter />} />
          </Route>

          {/* 우리의 이야기 */}
          <Route path="/story">
            <Route index element={<Story />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
