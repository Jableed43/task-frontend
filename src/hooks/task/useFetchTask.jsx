import { useQuery } from "@tanstack/react-query";

function useFetchTask({ page = 1, limit = 10, status = "" }) {
  const token = localStorage.getItem("token-task");
  const userId = localStorage.getItem("userId");
  const apiUrl = new URL(`${import.meta.env.VITE_BACKEND_ENDPOINT}api/task`);

  apiUrl.searchParams.append("page", page);
  apiUrl.searchParams.append("limit", limit);
  apiUrl.searchParams.append("userId", userId);

  if (status && status !== "All") {
    apiUrl.searchParams.append("status", status);
  }

  const { data, error, isLoading, isFetched, refetch } = useQuery({
    queryKey: ["tasks", page, limit, status, userId], 
    queryFn: async () => {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      return response.json();
    },
    keepPreviousData: true,
  });

  return {
    tasks: data?.tasks || [],
    totalTasks: data?.totalTasks || 0,
    totalPages: data?.totalPages || 1,
    currentPage: data?.currentPage || 1,
    error: error?.message,
    loading: isLoading,
    done: isFetched,
    fetchTask: refetch, 
  };
}

export default useFetchTask;
