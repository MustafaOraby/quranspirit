      <div className="sticky bottom-0 left-0 right-0 flex flex-col items-center justify-center rounded-t-[30px] text-foreground bg-background border-t-2 border-gray-300 dark:border-gray-700">
        <span className="font-bold text-xl">{autherName}</span>
        {radioUrl && (
          <AudioPlayer
          key={radioUrl}
          src={radioUrl}

          onPlay={() => console.log("onPlay")} // Callback fired when the audio is playing
          onClickPrevious={() => console.log("onClickPrevious")} // Callback fired when the user clicks the previous button
          onClickNext={() => console.log("onClickNext")} // Callback fired when the user clicks the next button
          autoPlay
          className="w-full"
          showJumpControls={false}
          showDownloadProgress={false}
          // customAdditionalControls={[]}
          customVolumeControls={[RHAP_UI.VOLUME]}
          layout="horizontal"
          customProgressBarSection={[RHAP_UI.PROGRESS_BAR, RHAP_UI.CURRENT_TIME]}	       
          // customControlsSection={[RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME]}
          // hasDefaultKeyBindings	={true}
          // autoPlayAfterSrcChange={true}
          volumeJumpStep={0.1}
          timeFormat="mm:ss"
          

          />
        
        )}
      </div>