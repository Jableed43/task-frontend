import { useMutation } from "@tanstack/react-query";

function useCreateTask() {
    const token = localStorage.getItem("token-task");
    const apiUrl = `${import.meta.env.VITE_BACKEND_ENDPOINT}api/task/create`;
    const userId = localStorage.getItem("userId");

    const mutation = useMutation({
        mutationFn: async (formData) => {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({...formData, userId}),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json();
        },
    });

    return mutation;
}

export default useCreateTask;
