// Packages import
import { Container } from "react-bootstrap";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import "./App.css";
// Router outlet
import { Outlet } from "react-router-dom";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="py-3"> 
        <Container>
          <Outlet />
          {/* this means that in router the children of App will be rendered here */}
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
