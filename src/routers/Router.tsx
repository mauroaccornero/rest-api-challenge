import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/pages/NotFound/NotFound";
import Homepage from "../components/pages/Homepage/Homepage";
import List from "../components/pages/List/List";
import Update from "../components/pages/Update/Update";
import Create from "../components/pages/Create/Create";
import Detail from "../components/pages/Detail/Detail";
import PATHS from "../constants/paths";
import ListUser from "../components/pages/ListUser/ListUser";

export const router = createBrowserRouter([
  {
    path: `${PATHS.HOMEPAGE}`,
    element: <Homepage />,
    errorElement: <NotFound />,
  },
  {
    path: `${PATHS.LIST}`,
    element: <List />,
    errorElement: <NotFound />,

  },
  {
    path: `${PATHS.DETAIL}/:id`,
    element: <Detail />,
    errorElement: <NotFound />,
  },
  {
    path: PATHS.CREATE,
    element: <Create />,
    errorElement: <NotFound />,
  },
  {
    path: PATHS.USERS,
    element: <ListUser />,
    errorElement: <NotFound />,
  },
  {
    path: `${PATHS.UPDATE}/:id`,
    element: <Update />,
    errorElement: <NotFound />,
  },
]);
