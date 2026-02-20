import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppToaster from "./components/common/AppToaster";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <AppToaster />
        <AppToaster />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
