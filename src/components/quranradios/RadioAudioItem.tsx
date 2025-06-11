import React from "react";

interface RadioAudioItemProps {
  radioKey: string;
  radioUrl: string;
}

const RadioAudioItem: React.FC<RadioAudioItemProps> = ({
  radioKey,
  radioUrl,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <audio key={radioKey} controls className="w-full" autoPlay>
        {radioUrl ? (
          <source src={radioUrl} type="audio/mpeg" />
        ) : (
          "Select a radio to play"
        )}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default RadioAudioItem;
