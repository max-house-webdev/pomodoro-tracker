import { useEffect } from "react";
import useSound from "use-sound";
import { sounds } from "../assets/sounds";
import { useThemeStore } from "../store";

export function useReadySound() {
  const isSoundAllowed = useThemeStore((state) => state.isSoundAllowed);
  const [play] = useSound(sounds.ready);

  useEffect(() => {
    if (!isSoundAllowed) return;

    play();
  });
}
