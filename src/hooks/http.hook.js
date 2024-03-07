import { useState, useCallback } from "react";
import axios from "axios";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, requestBody = null) => {
    setLoading(true);

    try {
      const response = await axios.post(
        url,
        requestBody,

        //md5("Valantis_20240307")
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth": "6b6cb1e55175afd4a78c2831ba83c4b9",
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
