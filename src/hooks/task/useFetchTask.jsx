import { useQuery } from "@tanstack/react-query";

function useFetchTask({ page = 1, limit = 10, status = "" }) {
  const token = localStorage.getItem("token-task");
  const userId = localStorage.getItem("userId"); // Obtener el userId
  const apiUrl = new URL(`${import.meta.env.VITE_BACKEND_ENDPOINT}api/task`);

  // Agregar parámetros de consulta a la URL
  apiUrl.searchParams.append("page", page);
  apiUrl.searchParams.append("limit", limit);
  apiUrl.searchParams.append("userId", userId); // Agregar el userId a la URL

  if (status && status !== "All") {
    apiUrl.searchParams.append("status", status);
  }

  const { data, error, isLoading, isFetched, refetch } = useQuery({
    queryKey: ["tasks", page, limit, status, userId], // Asegúrate de incluir el userId en la clave de la consulta
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
    keepPreviousData: true, // Mantiene los datos anteriores al cambiar de página
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
