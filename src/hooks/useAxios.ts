import { useEffect, useState } from "react";
import axios from "axios";

type Method = "get" | "post" | "put" | "patch";

const useAxios = <T>(path: string, method: Method = "get") => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const axiosConfig = {
      url: `${process.env.REACT_APP_API_URL}${path}`,
      method,
      timeout: 5000,
    };

    setLoading(true);
    axios(axiosConfig)
      .then((response) => {
        setData(() => response.data);
      })
      .catch((axiosError) => {
        // handle error
        setError(() => axiosError);
      })
      .finally(() => {
        // always executed
        setLoading(() => false);
      });
  }, [path, method]);

  return { loading, error, data };
};

export default useAxios;
