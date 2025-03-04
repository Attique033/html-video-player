import { useNavigate } from 'react-router-dom';

export const GifPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Time for a Break!
          </h1>
          <p className="mt-2 text-gray-600">
            Here&#39;s something to make you smile
          </p>
        </div>
        <div className="mx-auto max-w-md">
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnlncmlxMTkzd211eTAxeDI1YjUxbmdpZzllZnhwcHExamZ3cnpqZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7NoNw4pMNTvgc/giphy.gif"
            alt="Funny cat watching TV"
            className="w-full rounded-lg shadow-lg"
          />
          <button
            onClick={() => navigate('/video')}
            className="mt-8 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Video
          </button>
        </div>
      </div>
    </div>
  );
};
