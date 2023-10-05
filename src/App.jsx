import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ChatRoom,
  FullPageLoader,
  Login,
  MovieDetails,
  MovieList,
  Navigation,
  NotFound,
  Register,
} from "./components";
import { useAuth } from "./hooks";

const App = () => {
  const [, loading] = useAuth();
  return (
    <BrowserRouter>
      <Navigation>
        {loading && <FullPageLoader />}
        <Routes>
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details/:id" element={<MovieDetails />} />
          <Route path="/" element={<MovieList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
};

export default App;
