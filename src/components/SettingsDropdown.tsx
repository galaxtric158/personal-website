import { useCallback, useEffect, useRef, useState } from 'react';
import { Settings, Volume2, VolumeX, Music2, Music } from 'lucide-react';

interface Props {
  sound: {
    bloop: () => void;
    tick: () => void;
    setEnabled: (v: boolean) => void;
    enabledRef: React.MutableRefObject<boolean>;
  };
  musicPlaying: boolean;
  onToggleMusic: () => void;
}

export function SettingsDropdown({ sound, musicPlaying, onToggleMusic }: Props) {
  const [open, setOpen] = useState(false);
  const [sfxOn, setSfxOn] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleSfx = useCallback(() => {
    const next = !sfxOn;
    setSfxOn(next);
    sound.setEnabled(next);
    if (next) sound.bloop();
    else sound.tick();
  }, [sfxOn, sound]);

  const toggleMusic = useCallback(() => {
    sound.tick();
    onToggleMusic();
  }, [sound, onToggleMusic]);

  // Circle toggle: filled when on, hollow with border when off
  const CircleToggle = ({ on }: { on: boolean }) => (
    <div
      className={`w-5 h-5 rounded-full transition-all duration-200 ${
        on
          ? 'bg-bubble-500 shadow-sm'
          : 'bg-transparent border-2 border-ink-300'
      }`}
    />
  );

  return (
    <div ref={ref} className="fixed bottom-6 left-6 z-50">
      {/* Dropdown panel */}
      {open && (
        <div className="absolute bottom-14 left-0 w-56 card rounded-2xl p-3 shadow-soft-xl animate-fade-in-up">
          <div className="space-y-1">
            {/* SFX Toggle */}
            <button
              onClick={toggleSfx}
              onMouseEnter={() => sound.bloop()}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-ink-700 hover:bg-bubble-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {sfxOn ? (
                  <Volume2 size={16} className="text-bubble-500" />
                ) : (
                  <VolumeX size={16} className="text-ink-400" />
                )}
                <span className="font-medium">Sound Effects</span>
              </div>
              <CircleToggle on={sfxOn} />
            </button>

            {/* Music Toggle */}
            <button
              onClick={toggleMusic}
              onMouseEnter={() => sound.bloop()}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-ink-700 hover:bg-bubble-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {musicPlaying ? (
                  <Music2 size={16} className="text-bubble-500" />
                ) : (
                  <Music size={16} className="text-ink-400" />
                )}
                <span className="font-medium">Background Music</span>
              </div>
              <CircleToggle on={musicPlaying} />
            </button>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => {
          sound.tick();
          setOpen(!open);
        }}
        onMouseEnter={() => sound.bloop()}
        className={`p-3 rounded-full shadow-soft-lg transition-all duration-200 hover:scale-110 active:scale-90 ${
          open
            ? 'bg-bubble-600 text-white'
            : 'bg-white text-ink-500 border border-ink-200 hover:text-bubble-600'
        }`}
        aria-label="Settings"
        title="Settings"
      >
        <Settings size={18} />
      </button>
    </div>
  );
}