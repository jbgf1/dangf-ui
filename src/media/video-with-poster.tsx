import { Play } from 'lucide-react';
import {
  useRef,
  useState,
  type VideoHTMLAttributes,
} from 'react';

import { cn } from '../internal/cn';
import { Button } from '../primitives/button';

export interface VideoWithPosterProps
  extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src'> {
  src: string;
  showPosterOnEnd?: boolean;
  wrapperClassName?: string;
  playLabel?: string;
  onPlaybackError?: (error: unknown) => void;
}

export function VideoWithPoster({
  className,
  onEnded,
  onPause,
  onPlay,
  onPlaybackError,
  playLabel = 'Play video',
  poster,
  showPosterOnEnd = false,
  src,
  wrapperClassName,
  ...props
}: VideoWithPosterProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    try {
      await ref.current?.play();
    } catch (error) {
      setPlaying(false);
      onPlaybackError?.(error);
    }
  };

  return (
    <div
      data-slot="video-with-poster"
      className={cn(
        'dgf-root dgf:relative dgf:aspect-video dgf:w-full dgf:overflow-hidden dgf:rounded-[var(--dgf-radius-lg)] dgf:bg-black',
        wrapperClassName,
      )}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        controls={playing}
        className={cn('dgf:h-full dgf:w-full dgf:object-cover', className)}
        onPlay={(event) => {
          setPlaying(true);
          onPlay?.(event);
        }}
        onPause={(event) => {
          setPlaying(false);
          onPause?.(event);
        }}
        onEnded={(event) => {
          if (showPosterOnEnd && ref.current) {
            setPlaying(false);
            ref.current.currentTime = 0;
            ref.current.load();
          }
          onEnded?.(event);
        }}
        {...props}
      />
      {!playing ? (
        <div className="dgf:absolute dgf:inset-0 dgf:flex dgf:items-center dgf:justify-center dgf:bg-black/15">
          <Button
            type="button"
            variant="primary"
            size="icon"
            aria-label={playLabel}
            className="dgf:size-14 dgf:rounded-full dgf:shadow-[var(--dgf-shadow-lg)]"
            onClick={() => void play()}
          >
            <Play />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
