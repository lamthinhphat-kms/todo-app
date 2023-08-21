import {useEffect, useState} from 'react';
import {Dimensions, ScaledSize} from 'react-native';

export interface UseOrientationReturnValue {
  isPortrait: boolean;
  screenInfo: ScaledSize;
}

const useOrientation = (): UseOrientationReturnValue => {
  const [screenInfo, setScreenInfo] = useState<ScaledSize>(
    Dimensions.get('screen'),
  );
  useEffect(() => {
    const onChangeScreen = ({
      window,
      screen,
    }: {
      window: ScaledSize;
      screen: ScaledSize;
    }) => {
      setScreenInfo(screen);
    };
    const eventListener = Dimensions.addEventListener('change', onChangeScreen);
    return () => eventListener.remove();
  }, []);
  return {
    isPortrait: screenInfo.height > screenInfo.width,
    screenInfo,
  };
};

export default useOrientation;
