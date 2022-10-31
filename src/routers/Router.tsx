import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/pages/NotFound/NotFound";
import Homepage from "../components/pages/Homepage/Homepage";
import List from "../components/pages/List/List";
import Update from "../components/pages/Update/Update";
import Create from "../components/pages/Create/Create";
import Detail from "../components/pages/Detail/Detail";
import PATHS from "../constants/paths";

export const router = createBrowserRouter([
  {
    path: `${PATHS.HOMEPAGE}`,
    element: <Homepage />,
    errorElement: <NotFound />,
  },
  {
    path: `${PATHS.LIST}`,
    element: <List />,
  },
  {
    path: `${PATHS.DETAIL}/:id`,
    element: <Detail />,
    errorElement: <NotFound />,
  },
  {
    path: PATHS.CREATE,
    element: <Create />,
  },
  {
    path: `${PATHS.UPDATE}/:id`,
    element: <Update />,
    errorElement: <NotFound />,
  },
]);
