import { useState, useCallback } from "react";
import axios from "axios";
import MD5 from "crypto-js/md5";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, requestBody = null) => {
    setLoading(true);

    const now = new Date().toLocaleDateString().split(".").reverse().join(""); // 19.12.2019
    const stringPassword = "Valantis_" + now;
    const authHash = MD5(stringPassword).toString();

    try {
      const response = await axios.post(
        url,
        requestBody,

        //md5("Valantis_20240307")
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth": authHash,
          },
        }
      );

      setLoading(false);

      return response.data.result;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
