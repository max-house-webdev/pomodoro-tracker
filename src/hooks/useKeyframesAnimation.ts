import { usePrefersReducedMotion } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

export interface IUseKeyframesAnimation {
  animationCSSInterpolation: string;
  animationDuration?: number;
  animationTimingFunction?:
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "linear"
    | "step-start"
    | "step-end";
  animationDelay?: number;
  animationIterationCount?: number;
  animationDirection?:
    | "normal"
    | "reverse"
    | "alternative"
    | "alternate-reverse";
  animationFillMode?: "none" | "forwards" | "backwards" | "both";
  animationPlayState?: "running" | "paused";
}

export function useKeyframesAnimation(props: IUseKeyframesAnimation) {
  const {
    animationCSSInterpolation,
    animationDuration = 400,
    animationTimingFunction = "ease-in-out",
    animationDelay = 0,
    animationIterationCount = 1,
    animationDirection = "normal",
    animationFillMode = "none",
    animationPlayState = "running",
  } = props;

  const prefersReducedMotion = usePrefersReducedMotion();

  const animationKeyframes = keyframes`${animationCSSInterpolation}`;
  const animation = `
    ${animationKeyframes} 
    ${animationDuration}ms 
    ${animationTimingFunction} 
    ${animationDelay}ms 
    ${animationIterationCount}
    ${animationDirection}
    ${animationFillMode}
    ${animationPlayState}`;

  return prefersReducedMotion ? undefined : animation;
}
