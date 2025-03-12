import { useQuery } from "@tanstack/react-query";

function useFetchUser() {
  const token = localStorage.getItem("token-task");
  const initialUrl = `${import.meta.env.VITE_BACKEND_ENDPOINT}api/user`;

  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(initialUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    },
  });

  return {
    users: data || [],
    error: error?.message,
    loading: isLoading,
    done: isFetched,
  };
}

export default useFetchUser;
