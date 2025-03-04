import { YouTubePlayer } from '../components/YouTubePlayer';

export const HomePage = () => {
  return (
    <div className="min-h-screen w-screen py-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <YouTubePlayer />
      </div>
    </div>
  );
};
