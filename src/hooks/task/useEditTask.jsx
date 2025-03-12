import { useMutation } from "@tanstack/react-query";

function useEditTask() {
  const token = localStorage.getItem("token-task");
  const initialUrl = `${import.meta.env.VITE_BACKEND_ENDPOINT}api/task/update/`;

  const mutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      const response = await fetch(`${initialUrl}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to edit task");
      }

      return response.json();
    },
  });

  return mutation;
}

export default useEditTask;
