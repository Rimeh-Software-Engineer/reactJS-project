import { Button, Menu, Text, useMantineTheme } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { ReactNode } from "react";

type MenuButton = {
  variant: string;
  radius: string;
  label: string;
  items: {
    icon: ReactNode;
    label: string;
  }[];
};
export function MenuButton(props: MenuButton) {
  const theme = useMantineTheme();
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={150}
      withinPortal
    >
      <Menu.Target>
        <Button
          rightIcon={<IconChevronDown size="1.05rem" stroke={1.5} />}
          variant={props.variant}
          radius={props.radius}
          pr={12}
        >
          {props.label}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {props.items.map((item) => (
          <Menu.Item
            icon={item.icon}
            // rightSection={
            //   <Text size="xs" transform="uppercase" weight={700} color="dimmed">
            //     Ctrl + P
            //   </Text>
            // }
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
