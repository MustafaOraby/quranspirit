"use client";

import React, { useState, useEffect } from "react";
import { RadiosData, Radio } from "@/utils/types";
import "react-h5-audio-player/lib/styles.css";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";


const QuranRadios = () => {
  const [radioUrl, setRadioUrl] = useState("");
  const [autherName, setAutherName] = useState("");
  const [quranList, setQuranList] = useState<Radio[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mp3quran.net/api/v3/radios");
        if (!response.ok) throw new Error("Failed to fetch data");
        const radioData: RadiosData = await response.json();
        setQuranList(radioData.radios);
      } catch {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!quranList.length || !radioUrl) return;
    const index = quranList.findIndex((radio) => radio.url === radioUrl);
    if (index !== -1) {
      setAutherName(quranList[index].name);
      setCurrentIndex(index);
    }
  }, [radioUrl, quranList]);

  const handleButtonClick = (itemUrl: string) => {
    if (radioUrl === itemUrl) {
      setRadioUrl("");
      setAutherName("");
      setCurrentIndex(null);
    } else {
      setRadioUrl(itemUrl);
    }
  };

  const handleNext = () => {
    if (currentIndex !== null && currentIndex < quranList.length - 1) {
      setRadioUrl(quranList[currentIndex + 1].url);
    }
  };

  const handlePrev = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setRadioUrl(quranList[currentIndex - 1].url);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <section className="p-2">
      <div className="flex justify-center items-center flex-wrap gap-2 md:gap-5">
        {quranList.map((radio) => (
          <button
            onClick={() => handleButtonClick(radio.url)}
            key={radio.id}
            className="bg-background-secondary dark:bg-background-secondary-dark text-text dark:text-text-dark  border-2 border-accent dark:border-accent-dark w-[30%] h-[55px] py-2 flex items-center justify-center active:bg-accent rounded-3xl"
          >
            <span className="p-0.5 text-[8px] md:text-[18px] font-semibold xl:font-bold">
              {radio.name}
            </span>
          </button>
        ))}
      </div>

      {radioUrl && currentIndex !== null && (
        <div className="sticky bottom-0 left-0 right-0 flex flex-col items-center justify-center rounded-t-[30px] text-foreground bg-secondary dark:bg-primary border-t-2 border-gray-300 dark:border-gray-700">
          <span className="font-bold text-lg text-center p-1">{autherName}</span>
          <AudioPlayer
            key={radioUrl}
            src={radioUrl}
            autoPlay
            showSkipControls={true}
            onClickPrevious={handlePrev}
            onClickNext={handleNext}
            showJumpControls={false}
            customAdditionalControls={[]}
            customVolumeControls={[RHAP_UI.VOLUME]}
            layout="horizontal"
            customProgressBarSection={[
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.CURRENT_TIME,
            ]}
            volumeJumpStep={0.1}
            timeFormat="mm:ss"
          />
        </div>
      )}
    </section>
  );
};

export default QuranRadios;
