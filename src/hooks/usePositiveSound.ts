import useSound from "use-sound";
import { sounds } from "../assets/sounds";
import { useThemeStore } from "../store";

export function usePositiveSound() {
  const isSoundAllowed = useThemeStore((state) => state.isSoundAllowed);

  const [play] = useSound(sounds.positive);

  const noop = () => {};

  if (isSoundAllowed) {
    return play;
  }

  return noop;
}
