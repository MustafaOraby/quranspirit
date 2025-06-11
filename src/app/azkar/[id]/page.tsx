'use client';

import { useState, useEffect, useRef } from 'react';
import { getCategoryById, getAzkarByCategory } from '@/Data/azkarMap';
import { useParams } from 'next/navigation';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface Zikr {
  id: number;
  text: string;
  count: number;
  audio: string;
  filename: string;
}

export default function AzkarCategoryPage() {
  const params = useParams();
  const categoryId = Number(params.id);
  const [category, setCategory] = useState<ReturnType<typeof getCategoryById> | null>(null);
  const [counters, setCounters] = useState<{ [key: string]: number }>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRefs = useRef<{ [key: string]: AudioPlayer }>({});

  useEffect(() => {
    const categoryData = getCategoryById(categoryId);
    setCategory(categoryData);
  }, [categoryId]);

  const handleCount = (zikrId: number) => {
    const key = `${categoryId}-${zikrId}`;
    setCounters(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1
    }));
  };

  const resetCount = (zikrId: number) => {
    const key = `${categoryId}-${zikrId}`;
    setCounters(prev => ({
      ...prev,
      [key]: 0
    }));
  };

  const handleAudioPlay = (audioId: string) => {
    // Pause all other audio elements
    Object.entries(playerRefs.current).forEach(([id, player]) => {
      if (id !== audioId && player.audio.current) {
        player.audio.current.pause();
      }
    });
    setIsPlaying(true);
  };

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">جاري التحميل...</div>
      </div>
    );
  }

  const azkar = getAzkarByCategory(categoryId);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">{category.category}</h1>
        
        {category.audio && (
          <div className="mb-8 flex justify-center  xl:dark:bg-[#1f2937]  xl:p-3 xl:rounded-4xl ">
            <AudioPlayer
              ref={(el) => {
                if (el) playerRefs.current['category'] = el;
              }}
              src={category.audio}
              showSkipControls={false}
              showJumpControls={false}
              customAdditionalControls={[]}
              customVolumeControls={[RHAP_UI.VOLUME]}
              layout="horizontal"
              customProgressBarSection={[
                RHAP_UI.PROGRESS_BAR,
                RHAP_UI.CURRENT_TIME,
                // RHAP_UI.DURATION,
              ]}
              volumeJumpStep={0.1}
              timeFormat="mm:ss"
              className="w-full"
              onPlay={() => handleAudioPlay('category')}
              
            />
          </div>
        )}

        <div className="space-y-6">
          {azkar.map((zikr) => {
            const currentCount = counters[`${categoryId}-${zikr.id}`] || 0;
            const isComplete = currentCount >= zikr.count;
            const audioId = `zikr-${zikr.id}`;

            return (
              <div
                key={zikr.id}
                className={`p-6 rounded-lg ${
                  isComplete
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-background-secondary dark:bg-background-secondary-dark'
                }`}
              >
                <div className="text-xl mb-4 text-right leading-relaxed">{zikr.text}</div>
                
                <div className="flex items-center justify-between flex-col mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => resetCount(zikr.id)}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      إعادة
                    </button>
                    <span className="text-lg font-semibold">
                      {currentCount} / {zikr.count}
                    </span>
                  </div>
                  <div className='w-full xl:w-[70%] dark:bg-[#1f2937]  xl:p-3 xl:rounded-4xl ' >
                    <AudioPlayer
                    ref={(el) => {
                      if (el) playerRefs.current[audioId] = el;
                    }}
                    src={zikr.audio}
                    showSkipControls={false}
                    showJumpControls={false}
                    customAdditionalControls={[]}
                    customVolumeControls={[RHAP_UI.VOLUME]}
                    layout="horizontal"
                    customProgressBarSection={[
                      RHAP_UI.PROGRESS_BAR,
                      RHAP_UI.CURRENT_TIME,
                      // RHAP_UI.DURATION,
                    ]}
                    volumeJumpStep={0.1}
                    timeFormat="mm:ss"
                    className="w-64"
                    onPlay={() => handleAudioPlay(audioId)}
                  /></div>
                </div>

                <button
                  onClick={() => handleCount(zikr.id)}
                  disabled={isComplete}
                  className={`w-full py-2 rounded-lg transition-colors ${
                    isComplete
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-accent hover:bg-accent-dark text-white'
                  }`}
                >
                  {isComplete ? 'تم' : 'تسبيح'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
} 