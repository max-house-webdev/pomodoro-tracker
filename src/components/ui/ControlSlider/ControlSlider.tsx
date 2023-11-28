import React from "react";
import {
  HStack,
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
  VStack,
  Text,
} from "@chakra-ui/react";
import {
  useBrandGreenModeValue,
  useBrandRedModeValue,
  useTextColor,
} from "../../../hooks";
import { hexToRgb } from "../../../service";

type TRole = "workInterval" | "restInterval";

export interface IControlSlider {
  role: TRole;
}

export function ControlSlider(props: IControlSlider & SliderProps) {
  const {
    onChange = (value) => {},
    min = 1,
    max = 10,
    defaultValue = 10,
    value,
    role,
  } = props;

  type TBrandColorSchema = {
    thumbColor: string;
    filledTrackColor: string;
    boxShadowColorRGBA: string;
  };
  type TColorSchema = Record<"brandRed" | "brandGreen", TBrandColorSchema>;

  const colorSchema: TColorSchema = {
    brandRed: {
      thumbColor: "",
      filledTrackColor: "",
      boxShadowColorRGBA: "",
    },
    brandGreen: {
      thumbColor: "",
      filledTrackColor: "",
      boxShadowColorRGBA: "",
    },
  };

  const textColor = useTextColor();

  colorSchema.brandRed.thumbColor = useBrandRedModeValue(400);
  const red100 = useBrandRedModeValue(100);
  colorSchema.brandRed.filledTrackColor = red100;
  colorSchema.brandRed.boxShadowColorRGBA = `rgba(${hexToRgb(red100).r}, ${
    hexToRgb(red100).g
  }, ${hexToRgb(red100).b}, 0.5)`;

  colorSchema.brandGreen.thumbColor = useBrandGreenModeValue(400);
  const green100 = useBrandGreenModeValue(100);
  colorSchema.brandGreen.filledTrackColor = green100;
  colorSchema.brandGreen.boxShadowColorRGBA = `rgba(${hexToRgb(green100).r}, ${
    hexToRgb(green100).g
  }, ${hexToRgb(green100).b}, 0.5)`;

  const setColorSchema = () => {
    switch (role) {
      case "workInterval": {
        return colorSchema.brandRed;
      }
      case "restInterval": {
        return colorSchema.brandGreen;
      }
    }
  };

  return (
    <VStack flex={"0 1 25%"} alignItems={"stretch"} maxW={"10rem"}>
      <HStack justifyContent={"space-between"}>
        <Text
          as="span"
          fontSize={[10, null, 12]}
          color={textColor}
          _selection={{ background: "none" }}
        >
          {min}
        </Text>
        <Text
          as="span"
          fontSize={[10, null, 12]}
          color={textColor}
          _selection={{ background: "none" }}
        >
          {max}
        </Text>
      </HStack>
      <Slider
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        onChange={(value) => {
          onChange(value);
        }}
        flex={"0 1 25%"}
        data-testid="ControlSlider"
      >
        <SliderTrack>
          <SliderFilledTrack bgColor={setColorSchema().filledTrackColor} />
        </SliderTrack>
        <SliderThumb
          bgColor={setColorSchema().thumbColor}
          _focusWithin={{
            boxShadow: `0px 0px 5px 5px ${
              setColorSchema().boxShadowColorRGBA
            };`,
          }}
        />
      </Slider>
    </VStack>
  );
}
