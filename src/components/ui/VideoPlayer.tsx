import { useRef, useState } from 'react'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from 'lucide-react'

interface VideoPlayerProps {
  src: string
  className?: string
}

export function VideoPlayer({ src, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play().catch(() => {
        /* play() peut être interrompu par pause() → AbortError, sans conséquence */
      })
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  function toggleMute() {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  function skip(seconds: number) {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + seconds))
  }

  function handleTimeUpdate() {
    const v = videoRef.current
    if (!v || !v.duration) return
    setCurrentTime(v.currentTime)
    setProgress((v.currentTime / v.duration) * 100)
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const v = videoRef.current
    if (!v || !v.duration) return
    const time = (Number(e.target.value) / 100) * v.duration
    v.currentTime = time
    setCurrentTime(time)
    setProgress(Number(e.target.value))
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-black ${className ?? ''}`}>
      <video
        ref={videoRef}
        src={src}
        className="w-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
        onClick={togglePlay}
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-10">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/30 accent-primary [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
        />

        <div className="flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => skip(-10)}
              className="rounded-full p-1 transition-colors hover:bg-white/20"
              title="-10s"
            >
              <SkipBack className="size-4" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="rounded-full bg-white/20 p-1.5 transition-colors hover:bg-white/30"
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>

            <button
              type="button"
              onClick={() => skip(10)}
              className="rounded-full p-1 transition-colors hover:bg-white/20"
              title="+10s"
            >
              <SkipForward className="size-4" />
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="rounded-full p-1 transition-colors hover:bg-white/20"
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
          </div>

          <span className="font-mono tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  )
}