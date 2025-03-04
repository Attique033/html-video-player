import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface YouTubePlayerProps {
  initialUrl?: string;
}

const isValidVideoUrl = (url: string) => {
  const videoExtensions = [
    '.mp4',
    '.webm',
    '.ogg',
    '.mov',
    '.avi',
    '.mkv',
    '.flv'
  ];
  return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

export const YouTubePlayer = ({ initialUrl }: YouTubePlayerProps) => {
  const [url, setUrl] = useState(initialUrl || '');
  const [isEditing, setIsEditing] = useState(!initialUrl);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('youtubePlayerState');
    if (savedData) {
      const {
        url: savedUrl,
        lastPlayTime: savedPlayTime,
        lastUpdateTime: savedUpdateTime
      } = JSON.parse(savedData);
      if (savedUrl && savedPlayTime && savedUpdateTime) {
        setUrl(savedUrl);

        const timeElapsed = (Date.now() - savedUpdateTime) / 1000;
        const newStartTime = savedPlayTime + timeElapsed;

        if (videoRef.current) {
          videoRef.current.currentTime = newStartTime;
        }
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      alert('Please enter a valid video URL');
      return;
    }

    if (!isValidVideoUrl(url)) {
      setError(
        'URL must end with a valid video extension (.mp4, .webm, .ogg, .mov, .avi, .mkv, .flv)'
      );
      return;
    }
    setIsEditing(false);
    const currentTime = Date.now();
    localStorage.setItem(
      'youtubePlayerState',
      JSON.stringify({
        url,
        lastPlayTime: 0,
        lastUpdateTime: currentTime
      })
    );
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const now = Date.now();
      localStorage.setItem(
        'youtubePlayerState',
        JSON.stringify({
          url,
          lastPlayTime: currentTime,
          lastUpdateTime: now
        })
      );
    }
  };

  if (isEditing) {
    return (
      <div className="flex h-full w-screen items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-xl p-6 shadow-lg sm:p-8">
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-center text-xl font-bold text-gray-900 sm:text-2xl">
              Add Video
            </h2>
            <p className="text-center text-xs text-gray-500 sm:text-sm">
              Enter the video URL below
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4 sm:mt-6 sm:space-y-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="videoUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Video URL
              </label>
              <input
                type="text"
                id="videoUrl"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                required
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-black transition-colors duration-200 focus:ring-blue-500 sm:p-4"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:py-4 sm:text-base"
            >
              Play Video
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!url) return null;

  return (
    <div className="flex h-screen w-full flex-col p-4">
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="relative w-full max-w-4xl">
          <div className="aspect-w-16 aspect-h-9">
            <video
              ref={videoRef}
              src={url}
              className="size-full rounded-lg object-contain"
              controls
              autoPlay
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
          <div className="mt-4 flex w-full justify-between">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-md bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Edit
            </button>
            <button
              onClick={() => navigate('/gif')}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              View GIF
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
