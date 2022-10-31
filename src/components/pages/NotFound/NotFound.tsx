import Layout from "../../layout/Layout/Layout";
import normalizeError from "../../../utils/normalizeError";
import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  const normalizedError = normalizeError(error, "Page not found");

  return (
    <Layout>
      <div id="error-page">
        <h2>Oops!</h2>
        <p>
          <i>{normalizedError.message}</i>
          {"statusText" in normalizedError && <i>normalizedError.statusText</i>}
        </p>
      </div>
    </Layout>
  );
};

export default NotFound;
