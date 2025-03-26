import { useForm } from '@tanstack/react-form'
import axios from 'axios';
import Cookies from 'js-cookie';
import { navigateToHome } from '~/utils/navigateToHome';
import type { AnyFieldApi } from '@tanstack/react-form'

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      try {
        const { email, password } = value;
        const response = await axios.post('http://localhost:9998/backend/login', { email, password });
        const { token } = response.data;
        Cookies.set('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
        alert('Login successful!');
        navigateToHome();
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }
    },
  })

  return (
    <div>
      <h1>Simple Form Example</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
        <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'An e-mail address is required'
                  : value.length < 3
                    ? 'e-mail must be at least 3 characters'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return (
                  value.includes('error') && 'No "error" allowed in e-mail'
                )
              },
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>E-mail:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )
            }}
          />
        </div>
        <div>
        <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'A password is required'
                  : value.length < 3
                    ? 'password must be at least 3 characters'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return (
                  value.includes('error') && 'No "error" allowed in password'
                )
              },
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>Password:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )
            }}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <>
              <button type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </button>
              <button type="reset" onClick={() => form.reset()}>
                Reset
              </button>
            </>
          )}
        />
      </form>
    </div>
  )
}
