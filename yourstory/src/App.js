import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme, { media } from "./styles/theme";

// 메인 페이지들
import Home from "./pages/Home";
import Volunteer from "./pages/Volunteer";
import Library from "./pages/Library";
import Story from "./pages/Story";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";

// 봉사활동 관련 서브페이지들
import VolunteerDetail from "./pages/volunteer/VolunteerDetail";
import VolunteerStatus from "./pages/volunteer/VolunteerStatus";
import VolunteerDiary from "./pages/volunteer/VolunteerDiary";

// 도서관 관련 서브페이지들
import BookDetail from "./pages/library/BookDetail";
import BookViewer from "./pages/library/BookViewer";
import LetterBox from "./pages/library/LetterBox";

// 이야기 관련 서브페이지
import StoryDetail from "./pages/story/StoryDetail";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* 인증 관련 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 메인 레이아웃 */}
          <Route path="/">
            <Route index element={<Home />} />

            {/* 봉사활동 */}
            <Route path="work">
              <Route index element={<Volunteer />} />
              <Route path=":work_id" element={<VolunteerDetail />} />
              <Route path="my-status" element={<VolunteerStatus />} />
              <Route path="record" element={<VolunteerDiary />} />
            </Route>

            {/* 이타적 도서관 */}
            <Route path="/library" element={<Library />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/book/pdf/:id" element={<BookViewer />} />
            <Route path="/letter/list/:bookId" element={<LetterBox />} />

            {/* 우리의 이야기 */}
            <Route path="story">
              <Route index element={<Story />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
