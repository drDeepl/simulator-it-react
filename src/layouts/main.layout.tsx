import React, { useState } from "react";
import { Button } from "primereact/button";

import preview_img from "../assets/img/preview_img.png";
import UnityComponent from "../components/unity/unity.component";

const MainLayout: React.FC = () => {
  const [isPlayGame, setIsPlayGame] = useState<boolean>(false);

  const onClickToPlayGame = () => {
    setIsPlayGame(true);
  };

  const onClickCloseGame = () => {
    setIsPlayGame(false);
  };

  return (
    <div className="main-container">
      <div>
        <div className="nav-container">
          <div className="nav-block-container btn-home"></div>
          <div className="navbar-menu">
            <p className="navbar-preview-text">СИМУЛЯТОР IT ПРОФЕССИЙ</p>
          </div>
          <div className="nav-block-container"></div>
        </div>
      </div>
      <div className="main-content">
        <div className="main-preview-layout">
          <div className="preview-description">
            <p>
              “Симулятор IT профессий” - уникальный виртуальный симулятор,
              который позволяет вам погрузиться в мир информационных технологий
              и развивать свои профессиональные навыки в безопасной и интересной
              среде. Пройдите реалистичные задания в трех основных
              IT-профессиях: техника, веб-дизайнера и системного администратора,
              взаимодействуйте с виртуальными коллегами и преподавателями, и
              получите практическую подготовку в безопасной среде. “Симулятор IT
              профессий” - это доступная платформа для знакомства с
              разнообразными IT-профессиями, которая поможет вам определиться с
              выбором карьеры и развить необходимые навыки. Не упустите
              возможность стать экспертом в IT-сфере!
            </p>
          </div>

          <div className="preview-container">
            <img className="preview-img" src={preview_img} alt="Preview" />
            <Button
              className="preview-btn max-h-2rem mt-1"
              size="small"
              onClick={onClickToPlayGame}
            >
              Играть
            </Button>
          </div>

          <UnityComponent
            isPlayGame={isPlayGame}
            onClickCloseGame={onClickCloseGame}
          />
        </div>
      </div>
      <div className="marquee-container">
        <div className="marquee">
          {[
            "⭐",
            "техник",
            "⭐",
            "веб-дизайнер",
            "⭐",
            "системный администратор",
            "⭐",
          ].map((profLabel, index) => (
            <span key={index}>{profLabel}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
