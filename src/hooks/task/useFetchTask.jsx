import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../useAuth";

function useFetchTask({ page = 1, limit = 10, status = "" }) {
  const token = localStorage.getItem("token-task");
  const userId = localStorage.getItem("userId");
  const apiUrl = new URL(`${import.meta.env.VITE_BACKEND_ENDPOINT}api/task`);
  const { logout } = useAuth();


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

      if (response.status === 401) {
        logout();
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. You have been logged out.",
        });
        throw new Error("Session expired");
      }

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
