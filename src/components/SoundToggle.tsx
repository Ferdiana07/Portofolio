"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const track = "/music/3%20Minute%20Timer%20with%20Relaxing%20Lofi%20Music.mp3";

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const playerRef = useRef<HTMLAudioElement>(null);
  const enabledRef = useRef(false);
  const intent = useRef(0);

  useEffect(() => {
    const player = playerRef.current;
    const visibility = () => {
      if (!player) return;
      if (document.hidden) player.pause();
      else if (enabledRef.current) void player.play().catch(() => {
        enabledRef.current = false; setEnabled(false); setUnavailable(true);
      });
    };
    document.addEventListener("visibilitychange", visibility);
    return () => { document.removeEventListener("visibilitychange", visibility); player?.pause(); };
  }, []);

  const toggle = async () => {
    const player = playerRef.current;
    if (!player) return;
    const operation = ++intent.current;
    enabledRef.current = !enabledRef.current;
    setUnavailable(false);
    if (!enabledRef.current) { player.pause(); setEnabled(false); return; }
    try {
      // No audio request is made until the visitor explicitly starts music.
      if (!player.getAttribute("src")) player.src = track;
      if (unavailable) player.load();
      player.volume = .18;
      await player.play();
      if (operation === intent.current) setEnabled(true);
    } catch {
      if (operation !== intent.current) return;
      enabledRef.current = false; setEnabled(false); setUnavailable(true);
    }
  };

  return (
    <div className="music-control" data-enabled={enabled}>
      <audio ref={playerRef} preload="none" loop playsInline hidden aria-hidden="true" onError={() => {
        enabledRef.current = false; setEnabled(false); setUnavailable(true);
      }} />
      <button type="button" className="sound-toggle" aria-pressed={enabled} aria-label={enabled ? "Musik on, matikan musik" : unavailable ? "Coba putar lagi, musik belum tersedia" : "Nyalakan musik lofi"} onClick={toggle} title={unavailable ? "Musik belum bisa dimuat. Klik untuk mencoba lagi." : "Lofi dari koleksi Caesar"}>
        {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        <span>{enabled ? "Musik on" : unavailable ? "Coba putar lagi" : "Nyalakan musik"}</span>
      </button>
    </div>
  );
}
