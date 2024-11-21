import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Video {
  id: string;
  url: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
}

const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
    username: '@dancerstar',
    description: '✨ Living my best life #dance #fun',
    likes: 1234,
    comments: 123,
  },
  {
    id: '2',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
    username: '@naturelover',
    description: '🌸 Spring vibes #nature #peaceful',
    likes: 2345,
    comments: 234,
  },
];

const VideoFeed = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());

  const handleLike = (videoId: string) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const video = document.querySelector('video');
    if (video) {
      video.muted = !isMuted;
    }
  };

  return (
    <div className="h-screen w-full bg-black">
      {MOCK_VIDEOS.map((video, index) => (
        <div
          key={video.id}
          className={cn(
            "h-screen w-full absolute top-0 transition-all duration-300",
            index === currentVideoIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <video
            className="h-full w-full object-cover"
            src={video.url}
            loop
            muted={isMuted}
            autoPlay
            playsInline
          />
          
          {/* Video Info */}
          <div className="absolute bottom-0 left-0 p-4 text-white z-20 w-full bg-gradient-to-t from-black/60 to-transparent">
            <h2 className="font-bold text-lg">{video.username}</h2>
            <p className="text-sm">{video.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="absolute right-4 bottom-20 flex flex-col gap-6 z-20">
            <button
              onClick={() => handleLike(video.id)}
              className="flex flex-col items-center"
            >
              <Heart
                className={cn(
                  "w-8 h-8 transition-all",
                  likedVideos.has(video.id) && "fill-tiktok-pink text-tiktok-pink animate-heart-burst"
                )}
              />
              <span className="text-white text-sm">{video.likes}</span>
            </button>
            
            <button className="flex flex-col items-center">
              <MessageCircle className="w-8 h-8 text-white" />
              <span className="text-white text-sm">{video.comments}</span>
            </button>
            
            <button className="flex flex-col items-center">
              <Share2 className="w-8 h-8 text-white" />
              <span className="text-white text-sm">Share</span>
            </button>
          </div>

          {/* Sound Control */}
          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 z-20 p-2 bg-black/40 rounded-full"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;