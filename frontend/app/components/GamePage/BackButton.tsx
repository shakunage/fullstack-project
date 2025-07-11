import { useNavigate } from 'react-router';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl mb-4">
      <button
        onClick={() => void navigate(-1)}
        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 flex items-center"
        aria-label="Go back"
      >
        <span className="mr-2 text-2xl" aria-hidden="true">
          &larr;
        </span>
      </button>
    </div>
  );
}
