import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppToaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="light"
    />
  );
}

export default AppToaster;
