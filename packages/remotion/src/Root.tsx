import { Composition } from 'remotion';
import { DemoVideo } from './DemoVideo';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="ZentroDemo"
        component={DemoVideo}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          scenes: [],
          durationInFrames: 1800,
          fps: 30,
          width: 1920,
          height: 1080,
          musicPath: '',
        }}
      />
    </>
  );
};
