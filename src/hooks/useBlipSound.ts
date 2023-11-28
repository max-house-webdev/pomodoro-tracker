import { useThemeStore } from "./../store/themeStore/useThemeStore";
import useSound from "use-sound";
import { sounds } from "../assets/sounds";

export function useBlipSound() {
  const isSoundAllowed = useThemeStore((state) => state.isSoundAllowed);
  const [play] = useSound(sounds.blip);

  const noop = () => {};

  if (isSoundAllowed) {
    return play;
  }

  return noop;
}
