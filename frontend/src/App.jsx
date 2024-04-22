// Packages import
import { Container } from "react-bootstrap";
import "./App.css";

// Components 
import Header from "./components/Header";
import Footer from "./components/Footer";

// Screens/Pages
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App;
