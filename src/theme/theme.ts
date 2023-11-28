import { extendTheme } from "@chakra-ui/react";

export type TColor = {
  100: string;
  400: string;
};

export type TRed = TColor & {
  200: string;
  600: string;
};

export type TGreen = TColor;

export type TGray = TColor & {
  200: string;
  300: string;
};

export type TYellow = TColor;
export type TPurple = TColor;
export type TCyan = TColor;

export const extendedTheme = extendTheme({
  colors: {
    brandYellow: {
      100: "#FFDDA9",
      400: "#FFAE35",
    },
    brandInvertedYellow: {
      100: "#002256",
      400: "#0051ca",
    },
    brandPurple: {
      100: "#DFDCFE",
      400: "#9C97D7",
    },
    brandInvertedPurple: {
      100: "#202301",
      400: "#636828",
    },
    brandCyan: {
      100: "#C5F1FF",
      400: "#7FC2D7",
    },
    brandInvertedCyan: {
      100: "#3a0e00",
      400: "#803d28",
    },
    brandRed: {
      100: "#ea8979",
      200: "#ee735d",
      400: "#dc3e22",
      600: "#b7280f",
    },
    brandInvertedRed: {
      100: "#157686",
      200: "#118ca2",
      400: "#23c1dd",
      600: "#48d7f0",
    },
    brandGreen: {
      100: "#a8b64f",
      400: "#899441",
    },
    brandInvertedGreen: {
      100: "#5749b0",
      400: "#766bbe",
    },
    brandGray: {
      100: "#f4f4f4",
      200: "#cecece",
      300: "#c4c4c4",
      400: "#999999",
    },
    brandInvertedGray: {
      100: "#0b0b0b",
      200: "#131313",
      300: "#3b3b3b",
      400: "#666666",
    },
  },

  components: {
    Heading: {
      variants: {
        noSelection: {
          _selection: { background: "none" },
        },
      },
    },

    Text: {
      variants: {
        selectionGray: (props: { colorMode: string }) => {
          return {
            _selection:
              props.colorMode === "light"
                ? { background: "brandGray.300" }
                : { background: "brandInvertedGray.300" },
          };
        },
      },
    },

    Button: {
      variants: {
        brandPrimaryGreen: (props: { colorMode: string }) => {
          return {
            px: "50px",
            py: "20px",
            rounded: false,
            borderWidth: "3px",
            borderStyle: "solid",
            borderColor:
              props.colorMode === "light"
                ? "brandGreen.100"
                : "brandInvertedGreen.100",
            bgColor:
              props.colorMode === "light"
                ? "brandGreen.100"
                : "brandInvertedGreen.100",
            color: props.colorMode === "light" ? "white" : "gray.900",

            _disabled: {
              bgColor: "transparent",
              borderWidth: "3px",
              borderStyle: "solid",
              color:
                props.colorMode === "light"
                  ? "brandGray.300"
                  : "brandInvertedGray.300",
              borderColor:
                props.colorMode === "light"
                  ? "brandGray.300"
                  : "brandInvertedGray.300",
            },

            _focusVisible: {
              boxShadow: "unset",
              outlineColor:
                props.colorMode === "light"
                  ? "brandGreen.400"
                  : "brandInvertedGreen.400",
            },

            _hover: {
              bgColor:
                props.colorMode === "light"
                  ? "brandGreen.400"
                  : "brandInvertedGreen.400",
              borderColor:
                props.colorMode === "light"
                  ? "brandGreen.400"
                  : "brandInvertedGreen.400",
            },
            _active: {
              bgColor:
                props.colorMode === "light"
                  ? "brandGreen.100"
                  : "brandInvertedGreen.100",
              borderColor:
                props.colorMode === "light"
                  ? "brandGreen.400"
                  : "brandInvertedGreen.400",
            },
          };
        },

        brandPrimaryRed: (props: { colorMode: string }) => {
          return {
            px: "50px",
            py: "20px",
            rounded: false,
            borderWidth: "3px",
            borderStyle: "solid",
            borderColor:
              props.colorMode === "light"
                ? "brandRed.400"
                : "brandInvertedRed.400",
            bgColor:
              props.colorMode === "light"
                ? "brandRed.400"
                : "brandInvertedRed.400",
            color: props.colorMode === "light" ? "white" : "gray.900",

            _disabled: {
              bgColor: "transparent",
              borderWidth: "3px",
              borderStyle: "solid",
              color:
                props.colorMode === "light"
                  ? "brandGray.300"
                  : "brandInvertedGray.300",
              borderColor:
                props.colorMode === "light"
                  ? "brandGray.300"
                  : "brandInvertedGray.300",
            },

            _focusVisible: {
              boxShadow: "unset",
              outlineColor:
                props.colorMode === "light"
                  ? "brandRed.100"
                  : "brandInvertedRed.100",
            },
            _hover: {
              bgColor:
                props.colorMode === "light"
                  ? "brandRed.600"
                  : "brandInvertedRed.600",
              borderColor:
                props.colorMode === "light"
                  ? "brandRed.600"
                  : "brandInvertedRed.600",
            },
            _active: {
              bgColor:
                props.colorMode === "light"
                  ? "brandRed.200"
                  : "brandInvertedRed.200",
              borderColor:
                props.colorMode === "light"
                  ? "brandRed.600"
                  : "brandInvertedRed.600",
            },
          };
        },

        brandSecondaryRed: (props: { colorMode: string }) => {
          return {
            px: "50px",
            py: "20px",
            rounded: false,
            bgColor: "transparent",
            borderWidth: "3px",
            borderStyle: "solid",
            borderColor:
              props.colorMode === "light"
                ? "brandRed.400"
                : "brandInvertedRed.400",
            color:
              props.colorMode === "light"
                ? "brandRed.400"
                : "brandInvertedRed.400",

            _disabled: {
              borderWidth: "3px",
              borderStyle: "solid",
              color:
                props.colorMode === "light"
                  ? "brandGray.300"
                  : "brandInvertedGray.300",
              borderColor:
                props.colorMode === "light"
                  ? "brandGray.300"
                  : "brandInvertedGray.300",
            },

            _focusVisible: {
              boxShadow: "unset",
              outlineColor:
                props.colorMode === "light"
                  ? "brandRed.100"
                  : "brandInvertedRed.100",
            },
            _hover: {
              color: props.colorMode === "light" ? "white" : "gray.900",
              bgColor:
                props.colorMode === "light"
                  ? "brandRed.400"
                  : "brandInvertedRed.400",
            },

            _active: {
              color: props.colorMode === "light" ? "white" : "gray.900",
              bgColor:
                props.colorMode === "light"
                  ? "brandRed.100"
                  : "brandInvertedRed.100",
              borderColor:
                props.colorMode === "light"
                  ? "brandRed.400"
                  : "brandInvertedRed.400",
            },
          };
        },
      },
    },

    Checkbox: {
      variants: {
        brandGreen: (props: { colorMode: string }) => {
          return {
            label: {
              fontSize: [14, null, 18],
              fontWeight: "bold",
              color: props.colorMode === "light" ? "#333" : "whiteAlpha.600",
            },
            control: {
              rounded: "full",
              padding: 3,
              _checked: {
                bgColor:
                  props.colorMode === "light"
                    ? "brandGreen.100"
                    : "brandInvertedGreen.100",
                borderColor:
                  props.colorMode === "light"
                    ? "brandGreen.100"
                    : "brandInvertedGreen.100",
              },
            },
          };
        },
      },
    },
  },
});
