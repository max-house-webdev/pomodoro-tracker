import { Heading, HeadingProps } from "@chakra-ui/react";
import React from "react";
import { useTextColor } from "../../../hooks";

export interface IPageHeadingProps extends HeadingProps {
  textcontent: string;
}

export function PageHeading(props: IPageHeadingProps) {
  const { textcontent } = props;
  const textColor = useTextColor();

  return (
    <Heading
      as="h1"
      variant={"noSelection"}
      pb="0.5rem"
      fontSize={{ base: "md", md: "xl", lg: "2xl" }}
      color={textColor}
      {...props}
    >
      {textcontent}
    </Heading>
  );
}
