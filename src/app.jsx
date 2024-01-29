import React from "react";
import styled from "styled-components";
import ConfigurationContext from "./configuration/configuration.context";
import EnvironmentContext from "./configuration/environment.context";
import NavigationProvider from "./navigation/navigation.provider";
import StageSelector from "./stage/stageSelector.presenter";
import LeftSide from "./side/leftSide.presenter";
import RightSide from "./side/rightSide.presenter";
import Fight from "./fight/fight.presenter";
import ErrorBoundary from "./error/errorBoundary.view";
import FatalError from "./error/fatalError.view";
import Requirement from "./error/requirement.view";
import versusImagePath from "./assets/versus.png";
import HelpBar from "./help/bar.presenter";

const Wrapper = styled.main`
  flex: 1;
  height: 100%;
  background: #333;
  color: white;
  font-family: BadaBoom;
  overflow: hidden;
  background: url(./assets/background.jpg);
  background-size: cover;
  background-position: 50%;
`;
const CustomBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;
const Versus = styled.img`
  position: absolute;
  z-index: 100;
  left: 50vw;
  bottom: 0;
  height: 30vh;
  transform: translateX(-50%);
`;

export default function App() {
  const currentDirectory = mainAPI.getCurrentDirectory();
  if (!currentDirectory) {
    return (
      <Requirement>
        <p>No current directory</p>
      </Requirement>
    );
  }

  const jsonFilePath = mainAPI.resolve(currentDirectory, "quick-versus.json");
  const yamlFilePath = mainAPI.resolve(currentDirectory, "quick-versus.yml");
  if (!mainAPI.existsSync(jsonFilePath) && !mainAPI.existsSync(yamlFilePath)) {
    return (
      <Requirement>
        <p>
          Configuration file is missing:
          {jsonFilePath}
        </p>
      </Requirement>
    );
  }

  let configuration;
  let configurationFilePath;
  if (mainAPI.existsSync(jsonFilePath)) {
    const jsonContent = mainAPI.readFileSync(jsonFilePath);
    try {
      configuration = JSON.parse(jsonContent);
      configurationFilePath = jsonFilePath;
    } catch (error) {
      return (
        <FatalError>
          <p>Invalid JSON configuration file:</p>
          <p>{jsonFilePath}</p>
          <p>{error.message}</p>
        </FatalError>
      );
    }
  } else if (mainAPI.existsSync(yamlFilePath)) {
    try {
      configuration = mainAPI.configYaml(yamlFilePath);
      configurationFilePath = yamlFilePath;
    } catch (error) {
      return (
        <FatalError>
          <p>Invalid YAML configuration file:</p>
          <p>{yamlFilePath}</p>
          <p>{error.message}</p>
        </FatalError>
      );
    }
  }

  const environment = {
    currentDirectory,
    configurationFilePath
  };

  let customBackground;
  if (configuration.background) {
    const imagePath = mainAPI.resolve(currentDirectory, configuration.background);
    if (mainAPI.existsSync(imagePath)) {
      customBackground = <CustomBackground src={imagePath} />;
    }
  }

  if (configuration.sound && configuration.sound.background) {
    let volume = 100;
    if (configuration.sound.volume) {
      volume = configuration.sound.volume;
    }

    const soundPath = mainAPI.resolve(currentDirectory, configuration.sound.background);
    if (mainAPI.existsSync(soundPath)) {
      const audio = new Audio(soundPath);
      audio.volume = volume / 100;
      audio.loop = true;
      audio.play();

      environment.backgroundSound = audio;
    }
  }

  return (
    <ErrorBoundary>
      <EnvironmentContext.Provider value={environment}>
        <ConfigurationContext.Provider value={configuration}>
          <NavigationProvider>
            <Wrapper>
              {customBackground}
              <LeftSide />
              <RightSide />
              <Versus src={versusImagePath} />
              <StageSelector />
              <Fight />
              <HelpBar />
            </Wrapper>
          </NavigationProvider>
        </ConfigurationContext.Provider>
      </EnvironmentContext.Provider>
    </ErrorBoundary>
  );
}
