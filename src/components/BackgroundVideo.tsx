import { useEffect, useId, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type BackgroundVideoProps = {
  name: string;
  src: string;
  mobileSrc: string;
  poster: string;
};

/** Decorative footage loads near the viewport and rests when it cannot be seen. */
export function BackgroundVideo({ name, src, mobileSrc, poster }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const id = useId();
  const modeRef = useRef<"auto" | "paused" | "playing">("auto");
  const syncRef = useRef<() => void>(() => {});
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let inView = false;
    let disposed = false;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const sync = () => {
      const mode = modeRef.current;
      const autoBlocked = mode === "auto" && (motion.matches || connection?.saveData);
      if (!inView || document.hidden || mode === "paused" || autoBlocked || failed) {
        video.pause();
        return;
      }
      if (!video.getAttribute("src")) {
        video.src = matchMedia("(max-width: 760px)").matches ? mobileSrc : src;
      }
      void video
        .play()
        .then(() => {
          // A pending play promise can finish after an offscreen pause or unmount.
          if (disposed || !inView || document.hidden) video.pause();
        })
        .catch(() => {
          // Autoplay restrictions leave the poster and the explicit play control available.
        });
    };
    syncRef.current = sync;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.05;
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      syncRef.current = () => {};
      video.pause();
    };
  }, [src, mobileSrc, failed]);

  return (
    <div className="dc-film">
      <div className="dc-film-media" aria-hidden="true">
        <img src={poster} alt="" width="1920" height="1080" />
        <video
          id={id}
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          tabIndex={-1}
          hidden={failed}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setPlaying(false);
            setFailed(true);
          }}
        />
      </div>
      {!failed && (
        <button
          type="button"
          className="dc-film-toggle"
          aria-label={`${playing ? "Pause" : "Play"} ${name} background video`}
          aria-controls={id}
          onClick={() => {
            modeRef.current = playing ? "paused" : "playing";
            // Keep play() inside the trusted click so restricted mobile browsers can retry.
            syncRef.current();
          }}
        >
          {playing ? <Pause size={13} /> : <Play size={13} />}
          <span>{playing ? "Pause" : "Play"} film</span>
        </button>
      )}
    </div>
  );
}
