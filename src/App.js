import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Manage, { manageAction, manageLoader } from "./pages/Manage.jsx";
import Error from "./pages/Error";
import Home, { homeAction, homeLoader } from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MachineDetails, {
  detailAction,
  detailsLoader,
} from "./pages/MachineDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Wrapper />,
      errorElement: <Error />,
      children: [
        {
          path: "manage",
          element: <Manage />,
          action: manageAction,
          loader: manageLoader,
        },
        {
          path: ":machineId",
          element: <MachineDetails />,
          loader: detailsLoader,
          action: detailAction,
        },
        {
          index: true,
          element: <Home />,
          loader: homeLoader,
          action: homeAction,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
