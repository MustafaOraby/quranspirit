'use client';

import { useState, useRef } from 'react';
import { Radio } from '../../utils/types';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface RadioItemProps {
  radio: Radio;
  isPlaying: boolean;
  onSelect: (url: string | null) => void;
}

const RadioItem = ({ radio, isPlaying, onSelect }: RadioItemProps) => {
  const playerRef = useRef<AudioPlayer>(null);

  const handleClick = () => {
    if (isPlaying) {
      onSelect(null);
    } else {
      onSelect(radio.url);
    }
  };

  return (
    <>
      <div className="bg-background-secondary dark:bg-background-secondary-dark rounded-lg p-4 shadow-md ">
        <button
          onClick={handleClick}
          className={`w-full text-center p-3 rounded-lg transition-colors ${
            isPlaying
              ? 'bg-accent dark:bg-accent-dark text-white'
              : 'bg-background dark:bg-background-dark hover:bg-accent/10 dark:hover:bg-accent-dark/10'
          }`}
        >
          <span className="font-semibold ">{radio.name}</span>
        </button>
      </div>

      {isPlaying && (
        <div className=" bg-secondary dark:bg-primary border-t-2 border-gray-300 dark:border-gray-700 fixed bottom-0 left-0 right-0 pt-1 border-t  z-50">
          <div className=" mx-auto ">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-center m-auto">{radio.name}</span>
            </div>
            <AudioPlayer
              ref={playerRef}
              src={radio.url}
              autoPlay
              showSkipControls={false}
              showJumpControls={false}
              customAdditionalControls={[]}
              customVolumeControls={[RHAP_UI.VOLUME]}
              // layout="horizontal"
              customProgressBarSection={[
                RHAP_UI.PROGRESS_BAR,
                RHAP_UI.CURRENT_TIME,
                // RHAP_UI.DURATION,
              ]}
              volumeJumpStep={0.1}
              timeFormat="mm:ss"
              className="w-full "
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RadioItem; 