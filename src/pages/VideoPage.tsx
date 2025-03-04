import { useEffect, useState } from 'react';
import { YouTubePlayer } from '../components/YouTubePlayer';
import { useNavigate } from 'react-router-dom';

export const VideoPage = () => {
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('youtubePlayerState');
    if (savedData) {
      const { url } = JSON.parse(savedData);
      setSavedUrl(url);
    }
  }, []);

  if (!savedUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            No video found
          </h2>
          <p className="mt-2 text-gray-600">
            Please add a video from the home page
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-8 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add video
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <YouTubePlayer initialUrl={savedUrl} />
      </div>
    </div>
  );
};
