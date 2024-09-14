import { useEffect, useState } from "react";
import { Navbar, createStyles, getStylesRef, rem } from "@mantine/core";
import {
  IconGiftCard,
  IconLicense,
  IconMessage2,
  IconUsers,
  IconUser,
  IconShoppingCart,
  IconCategory,
  IconTrophy,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconCategory2 } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    textTransform: "uppercase",
    letterSpacing: rem(-0.25),
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.colors.brand[0],
      color: theme.white, // or another color based on your preference

      [`& .${getStylesRef("icon")}`]: {
        color: theme.white, // or another color based on your preference
      },
    },
  },

  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingTop: theme.spacing.md,
  },
}));

const tabs = {
  general: [
    { link: "/dashboard", label: "Dashboard", icon: IconLicense },
    { link: "/users", label: "Users", icon: IconUsers },
    { link: "/feedbacks", label: "Comments", icon: IconMessage2 },
    { link: "/offers", label: "Offers", icon: IconGiftCard },
    { link: "/products", label: "Products", icon: IconShoppingCart },
    { link: "/categories", label: "Categories", icon: IconCategory2 },
    {
      link: "/recommendations",
      label: "Recommendations",
      icon: IconTrophy,
    },
  ],
};

export function AppSideBar() {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const [section, setSection] = useState<"account" | "general">("general");
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const links = tabs["general"].map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.link === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.link);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));
  console.log(tabs["general"]);
  return (
    <Navbar
      height={"100vh"}
      width={{ sm: 250 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section>{links}</Navbar.Section>

      <Navbar.Section mt="xl" className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconUser className={classes.linkIcon} stroke={1.5} />
          <span>Account</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
