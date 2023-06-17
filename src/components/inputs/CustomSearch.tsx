import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

type CustomSearchProps = {
  inputProps?: TextInputProps;
  handleOnClick: () => void;
};
export function CustomSearch(props: CustomSearchProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight
              size="1.1rem"
              stroke={1.5}
              onClick={props.handleOnClick}
            />
          ) : (
            <IconArrowLeft
              size="1.1rem"
              stroke={1.5}
              onClick={props.handleOnClick}
            />
          )}
        </ActionIcon>
      }
      placeholder="Search"
      rightSectionWidth={42}
      {...props.inputProps}
    />
  );
}
