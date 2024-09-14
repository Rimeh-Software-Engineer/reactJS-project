import React from "react";
import {
  createStyles,
  Header,
  Group,
  Button,
  Text,
  Burger,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { animated, useSpring, config } from "@react-spring/web";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const AnimatedT = () => {
  const theme = useMantineTheme();
  const springProps = useSpring({
    opacity: 1,
    transform: "scale(1)",
    config: config.slow,
    loop: { reverse: true },
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
  });

  return (
    <animated.span style={springProps}>
      <span style={{ color: theme.colors.brand[0], fontWeight: 700 }}>T</span>
    </animated.span>
  );
};

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export function AppHeader({ opened, toggle }: HeaderProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Group align="center">
            <Text size={25} style={{ fontWeight: 700 }}>
              Discan
              <AnimatedT />
              ini
            </Text>
          </Group>

          <Group className={classes.hiddenMobile}>
            <Button variant="default" onClick={handleLogout}>
              Logout
            </Button>
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
    </>
  );
}
