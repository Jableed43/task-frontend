import { useMutation } from "@tanstack/react-query";

function useDeleteTask() {
  const token = localStorage.getItem("token-task");
  const initialUrl = `${import.meta.env.VITE_BACKEND_ENDPOINT}api/task/delete/`;

  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${initialUrl}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
    },
  });

  return {
    deleteTask: mutation.mutateAsync,
    error: mutation.error?.message,
    loading: mutation.isPending,
  };
}

export default useDeleteTask;
