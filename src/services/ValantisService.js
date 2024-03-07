import { useHttp } from "../hooks/http.hook";
import { BASE_URL } from "../config";

const useValantisService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _baseOffset = 1;

  // Get IDs
  const getAllIds = async (offset = _baseOffset) => {
    const requestBody = {
      action: "get_ids",
      params: { offset, limit: 50 },
    };

    const res = await request(BASE_URL, requestBody);
    return res;
  };

  const getItemsByIds = async (ids) => {
    const requestBody = {
      action: "get_items",
      params: { ids },
    };

    const res = await request(BASE_URL, requestBody);

    return res;
  };

  return {
    loading,
    error,
    clearError,
    getAllIds,
    getItemsByIds,
  };
};

export default useValantisService;
