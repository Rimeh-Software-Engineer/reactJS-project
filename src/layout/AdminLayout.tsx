import { AppShell, MediaQuery, useMantineTheme } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import { AppHeader } from "./header/AppHeader";
import { AppSideBar } from "./sidebar/AppSideBar";
import { useDisclosure } from "@mantine/hooks";

export default function AdminLayout() {
  const [opened, { toggle }] = useDisclosure(false);
  const auth = true;
  return (
    <AppShell
      styles={{
        main: {
          backgroundColor: "#f8f9fa",
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<AppSideBar opened={opened} toggle={toggle} />}
      header={
        <AppHeader
          opened={opened}
          toggle={toggle}
          {...{
            user: {
              name: "Jane Spoonfighter",
              email: "janspoon@fighter.dev",
              image:
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
            },
            tabs: [
              "Home",
              "Orders",
              "Education",
              "Community",
              "Forums",
              "Support",
              "Account",
              "Helpdesk",
            ],
          }}
        />
      }
    >
      {auth ? <Outlet /> : <Navigate to="/login" replace />}
    </AppShell>
  );
}
