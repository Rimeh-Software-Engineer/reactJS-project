import { useState } from "react";
import {
  Navbar,
  SegmentedControl,
  Text,
  createStyles,
  getStylesRef,
  rem,
} from "@mantine/core";
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconUsers,
  IconFileAnalytics,
  IconDatabaseImport,
  IconReceipt2,
  IconReceiptRefund,
  IconLogout,
  IconSwitchHorizontal,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

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
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
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
  // account: [
  //   { link: "", label: "Notifications", icon: IconBellRinging },
  //   { link: "", label: "Billing", icon: IconReceipt2 },
  //   { link: "", label: "Security", icon: IconFingerprint },
  //   { link: "", label: "SSH Keys", icon: IconKey },
  //   { link: "", label: "Databases", icon: IconDatabaseImport },
  //   { link: "", label: "Authentication", icon: Icon2fa },
  //   { link: "", label: "Other Settings", icon: IconSettings },
  // ],
  general: [
    { link: "/services", label: "Services", icon: IconLicense },
    {
      link: "/service-providers",
      label: "Service Providers",
      icon: IconShoppingCart,
    },
    // { link: "", label: "Orders", icon: IconShoppingCart },
    // { link: "", label: "Receipts", icon: IconLicense },
    // { link: "", label: "Reviews", icon: IconMessage2 },
    // { link: "", label: "Messages", icon: IconMessages },
    // { link: "", label: "Customers", icon: IconUsers },
    // { link: "", label: "Refunds", icon: IconReceiptRefund },
    // { link: "", label: "Files", icon: IconFileAnalytics },
  ],
};

export function AppSideBar() {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const [section, setSection] = useState<"account" | "general">("account");
  const [active, setActive] = useState("Services");

  const links = tabs["general"].map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      height={"100vh"}
      width={{ sm: 250 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section>
        {/* <Text
          weight={500}
          size="sm"
          className={classes.title}
          color="dimmed"
          mb="xs"
        >
          bgluesticker@mantine.dev
        </Text> */}

        {/* <SegmentedControl
          value={section}
          onChange={(value: "account" | "general") => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: "Account", value: "account" },
            { label: "System", value: "general" },
          ]}
        /> */}
      </Navbar.Section>

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

        {/* <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a> */}
      </Navbar.Section>
    </Navbar>
  );
}
