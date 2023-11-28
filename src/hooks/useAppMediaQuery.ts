import { useMediaQuery } from "@chakra-ui/react";

export function useAppMediaQuery() {
  const [base, sm, md, lg, xl, xxl] = useMediaQuery([
    "(max-width: 30em)",
    "(min-width: 30.1em)",
    "(min-width: 48em)",
    "(min-width: 62em)",
    "(min-width: 80em)",
    "(min-width: 96em)",
  ]);

  return { base, sm, md, lg, xl, xxl };
}
