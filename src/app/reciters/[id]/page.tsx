"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AllReciters } from "../../../utils/types";
import { fetchReciters } from "../../../Data/RecitersData";
import fetchSuwar from "../../../json/suwr.json";
import { TiStarburstOutline } from "react-icons/ti";
import { Search } from "lucide-react";
import "react-h5-audio-player/lib/styles.css";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { toast } from 'react-hot-toast';

const SingleAuthorPage = () => {
  const params = useParams();
  const id = params?.id;

  const [sortedReciters, setSortedReciters] = useState<AllReciters["reciters"]>([]);
  const [suwraUrl, setSuwraUrl] = useState("");
  const [currentSuwra, setCurrentSuwra] = useState<{ name: string; id: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSurah, setCurrentSurah] = useState<string | null>(null);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reciters = await fetchReciters();
        setSortedReciters(reciters);
      } catch (error) {
        console.error("Error fetching reciters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredSuwar = fetchSuwar.filter(suwra =>
    suwra.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    if (currentSuwra && currentSuwra.id < 114) {
      const nextSuwra = fetchSuwar.find(s => s.id === currentSuwra.id + 1);
      if (nextSuwra) {
        setCurrentSuwra(nextSuwra);
        setSuwraUrl(`${sortedReciters.find(r => r.moshaf.some(m => m.id === parseInt(id as string)))?.moshaf[0].server}/${nextSuwra.id.toString().padStart(3, "0")}.mp3`);
      }
    }
  };

  const handlePrev = () => {
    if (currentSuwra && currentSuwra.id > 1) {
      const prevSuwra = fetchSuwar.find(s => s.id === currentSuwra.id - 1);
      if (prevSuwra) {
        setCurrentSuwra(prevSuwra);
        setSuwraUrl(`${sortedReciters.find(r => r.moshaf.some(m => m.id === parseInt(id as string)))?.moshaf[0].server}/${prevSuwra.id.toString().padStart(3, "0")}.mp3`);
      }
    }
  };

  const handleSuwraClick = (url: string, name: string) => {
    setIsAudioLoading(true);
    setSuwraUrl(url);
    setCurrentSuwra({ name, id: parseInt(id as string) });

    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }

    const timeout = setTimeout(() => {
      if (isAudioLoading) {
        toast.error('نأسف لهذا توجد مشكلة بالخادم الان .. يرجى المحاوله لاحقا او اختيار قارئ آخر', {
          duration: 5000,
          position: 'top-center',
          style: {
            background: '#333',
            color: '#fff',
            textAlign: 'center',
            padding: '16px',
            borderRadius: '8px',
          },
        });
      }
    }, 4000);

    setLoadingTimeout(timeout);
  };

  const handleAudioLoaded = () => {
    setIsAudioLoading(false);
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }
  };

  const handleAudioError = () => {
    setIsAudioLoading(false);
    toast.error('نأسف لهذا توجد مشكلة بالخادم الان .. يرجى المحاوله لاحقا او اختيار قارئ آخر', {
      duration: 1500,
      position: 'bottom-center',
      style: {
        background: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '16px',
        borderRadius: '8px',
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  if (!sortedReciters.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Reciter not found
      </div>
    );
  }

  return (
    <section className="min-h-[calc(100vh-100px)] w-full flex flex-col items-center pb-24 mt-[30px] ">
      <style jsx global>{`
        .rhap_time {
          margin: 0 8px;
        }
        .rhap_progress-section {
          margin: 0 10px;
        }
      `}</style>
      <div className="w-full  px-4 ">
        {sortedReciters.map((reciter) => (
          <div key={reciter.id}>
            {reciter.moshaf.map((moshafItem) => (
              <div key={moshafItem.id}>
                {moshafItem.id === parseInt(id as string) && (
                  <>
                    <h2 className="text-3xl font-bold text-center mb-4 text-mainColor">
                      {reciter.name}
                    </h2>
                    <span className="block text-xl text-center mb-8 text-gray-600 dark:text-gray-300">
                      {moshafItem.name.replace(/^(.*?)\s*-\s*\1$/, "$1")}
                    </span>
                    
                    {/* Search Bar */}
                    <div className="relative mb-8 max-w-2xl mx-auto">
                      <div className="relativ">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowResults(true);
                          }}
                          onFocus={() => setShowResults(true)}
                          placeholder="ابحث عن سورة..."
                          className="w-full px-4 py-2 rounded-full bg-background-secondary dark:bg-background-secondary-dark text-text dark:text-text-dark border border-accent dark:border-accent-dark focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark"
                          dir="rtl"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      
                      {showResults && searchTerm && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-background dark:bg-background-dark border border-accent dark:border-accent-dark rounded-lg shadow-lg max-h-[300px] overflow-y-auto z-50">
                          {filteredSuwar.length > 0 ? (
                            filteredSuwar.map((suwra) => (
                              <div
                                key={suwra.id}
                                onClick={() => {
                                  handleSuwraClick(`${moshafItem.server}/${suwra.id.toString().padStart(3, "0")}.mp3`, suwra.name);
                                  setShowResults(false);
                                  setSearchTerm("");
                                }}
                                className="px-4 py-2 hover:bg-background-secondary dark:hover:bg-background-secondary-dark cursor-pointer text-right"
                              >
                                {suwra.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-gray-500 text-center">لا توجد نتائج</div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-5">
                      {fetchSuwar.map((suwra) => (
                        <div key={suwra.id}>
                          <button
                            className="bg-background-secondary font-semibold dark:bg-background-secondary-dark text-text dark:text-text-dark border-accent dark:border-accent-dark py-2 active:bg-accent bg-mainColor cursor-pointer border-2 rounded-4xl p-3 text-[20px] m-2 w-[140px] h-[50px] flex justify-end items-center"
                            onClick={() => {
                              handleSuwraClick(`${moshafItem.server}/${suwra.id.toString().padStart(3, "0")}.mp3`, suwra.name);
                            }}
                          >
                            <span className="text-[18px] m-2">{suwra.name}</span>
                            <TiStarburstOutline />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {suwraUrl && currentSuwra && (
        <div className="fixed bottom-0 left-0 right-0 w-full flex flex-col items-center justify-center bg-secondary dark:bg-primary border-t-2 border-gray-300 dark:border-gray-700">
          <span className="font-bold text-lg text-center p-1">{currentSuwra.name}</span>
          <div className="w-full mx-auto">
            {isAudioLoading && (
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[var(--accent)]"></div>
                <span className="text-sm">جارى التحميل</span>
              </div>
            )}

            
            <AudioPlayer
              key={suwraUrl}
              src={suwraUrl}
              autoPlay
              showSkipControls={true}
              onClickPrevious={handlePrev}
              onClickNext={handleNext}
              showJumpControls={false}
              // customAdditionalControls={[]}
              customVolumeControls={[RHAP_UI.VOLUME]}
              // layout="horizontal"
              customProgressBarSection={[
                RHAP_UI.PROGRESS_BAR,
                RHAP_UI.CURRENT_TIME,
                RHAP_UI.DURATION
              ]}
              volumeJumpStep={0.1}
              timeFormat="mm:ss"
              className="w-full"
              onLoadedData={handleAudioLoaded}
              onError={handleAudioError}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleAuthorPage;
