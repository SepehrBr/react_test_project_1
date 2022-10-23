import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Missing from "./components/Missing";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import EditPost from "./components/edit/EditPost";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
    return (
    <div className="App">
      <DataProvider>
        <Header title="React JS Blog App" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
