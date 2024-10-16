import { useCallback, useEffect, useRef, useState } from "react";

import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "./unity.module.scss";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";
import { BlockUI } from "primereact/blockui";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

interface UnityComponentProps {
  isPlayGame: boolean;
  onClickCloseGame: () => void;
}

const UnityComponent: React.FC<UnityComponentProps> = ({
  isPlayGame,
  onClickCloseGame,
}) => {
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    addEventListener,
    removeEventListener,
    requestFullscreen,
    unload,
  } = useUnityContext({
    loaderUrl: "/unitybuild/simulator_it_build.loader.js",
    dataUrl: "/unitybuild/simulator_it_build.data",
    frameworkUrl: "/unitybuild/simulator_it_build.framework.js",
    codeUrl: "/unitybuild/simulator_it_build.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [screenshotDatas, setScreenshotDatas] = useState<string[]>([]);
  const [scores, setScores] = useState<[number, number][]>([]);
  const [loadingPercentage, setLoadingPercentage] = useState<number>(
    loadingProgression
  );

  const [blocked, setBlocked] = useState(true);

  const handleClickFullscreen = () => {
    if (isLoaded === false) {
      return;
    }
    requestFullscreen(true);
  };

  const handleClickUnload = async () => {
    if (isLoaded === false) {
      return;
    }
    try {
      await unload();
      console.log("Unload success");
    } catch (error) {
      console.error(`Unable to unload: ${error}`);
    }
  };

  return (
    <Dialog
      visible={isPlayGame}
      onHide={() => {
        handleClickUnload().then(() => {
          onClickCloseGame();
        });
      }}
      style={{ width: "50vw" }}
    >
      <BlockUI
        className="w-full h-full"
        blocked={blocked === isLoaded}
        template={
          <Button
            className="pa-0"
            icon="pi pi-play"
            rounded
            size="small"
            onClick={() => {
              handleClickFullscreen();
              setBlocked(false);
            }}
          >
            {" "}
          </Button>
        }
      >
        <div className={styles.container + " card"}>
          <div className={styles.unityWrapper}>
            {isLoaded === false && (
              <div className={styles.loadingBar}>
                <div
                  className={styles.loadingBarFill}
                  style={{ width: loadingProgression * 100 }}
                />
              </div>
            )}

            <Unity
              className="w-full h-full"
              unityProvider={unityProvider}
              style={{ display: isLoaded ? "block" : "none" }}
            />
          </div>
        </div>
      </BlockUI>
    </Dialog>
  );
};

export default UnityComponent;
