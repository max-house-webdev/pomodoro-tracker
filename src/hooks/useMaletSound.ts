import useSound from "use-sound";
import { sounds } from "../assets/sounds";
import { useThemeStore } from "../store";

export function useMaletSound() {
  const isSoundAllowed = useThemeStore((state) => state.isSoundAllowed);
  const [play] = useSound(sounds.malet);

  const noop = () => {};

  if (isSoundAllowed) {
    return play;
  }

  return noop;
}
