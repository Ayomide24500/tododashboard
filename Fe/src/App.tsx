import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./router/Mainrouter";

const App = () => {
  return <RouterProvider router={mainRouter} />;
};

export default App;
