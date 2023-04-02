import React from "react";
import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import { InstructionList, PageHeading } from "../../../components";
import { useAppMediaQuery, useBrandGrayModeValue } from "../../../hooks";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

export function InstructionListWrapper() {
  const { lg } = useAppMediaQuery();
  const grayColor = useBrandGrayModeValue(300);

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      {lg ? (
        <>
          <PageHeading textcontent={"Ура! Теперь можно начать работать:"} />
          <InstructionList />
        </>
      ) : (
        <>
          <Button
            type="button"
            variant={"ghost"}
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={onToggle}
            _focusVisible={{ outlineColor: grayColor }}
            _hover={{ background: "transparent", textDecoration: "underline" }}
            aria-label={"toggle instruction list"}
          >
            <PageHeading textcontent={"Ура! Теперь можно начать работать:"} />
          </Button>
          <Collapse animateOpacity in={isOpen}>
            <InstructionList />
          </Collapse>
        </>
      )}
    </Box>
  );
}
