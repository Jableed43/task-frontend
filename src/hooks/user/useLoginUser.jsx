import { useMutation } from '@tanstack/react-query';

const loginUser = async (formData) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}api/user/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export default function useLoginUser() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token-task", data.token);
      localStorage.setItem("userId", data.user.id);
    },
  });
}
