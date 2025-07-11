import { FieldInfo } from '~/utils/loginFieldInfo';
import { useLogin } from '~/hooks/useLogin';

export default function Login() {
  const form = useLogin();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
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
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return value.includes('error') && 'No "error" allowed in e-mail';
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      E-mail:
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <FieldInfo field={field} />
                  </>
                );
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
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return value.includes('error') && 'No "error" allowed in password';
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      Password:
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
                    canSubmit ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400'
                  }`}
                >
                  {isSubmitting ? '...' : 'Submit'}
                </button>
                <button
                  type="reset"
                  onClick={() => form.reset()}
                  className="ml-4 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300"
                >
                  Reset
                </button>
              </div>
            )}
          />
        </form>
      </div>
    </div>
  );
}
