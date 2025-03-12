import { useMutation } from "@tanstack/react-query";

function useRegisterUser() {
  const initialUrl = `${import.meta.env.VITE_BACKEND_ENDPOINT}api/user/create`;

  const { mutateAsync, error, isLoading } = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(initialUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(response.statusText || "Registration failed");
      }

      return await response.json();
    },
  });

  return { registerUser: mutateAsync, error: error?.message, isLoading };
}

export default useRegisterUser;
