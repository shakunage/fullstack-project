import { useForm } from '@tanstack/react-form';
import { loginService } from '~/services/backendServices/loginService';
import { navigateToHome } from '~/utils/navigateToHome';

export function useLogin() {
  return useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      const loginSuccess = await loginService(value.email, value.password);
      if (!loginSuccess) {
        console.error('Login failed.');
        return;
      }
      alert('Login successful!');
      navigateToHome();
    },
  });
}
