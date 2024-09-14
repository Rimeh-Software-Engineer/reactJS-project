import React from "react";
import {
  Container,
  Grid,
  createStyles,
  Divider,
  Pagination,
  Loader,
  Text,
} from "@mantine/core";
import TitleSection from "../components/TitleSection";
import CreateUsersModal from "../components/CreateUsersModal";
import { CustomSearch } from "../../../components/inputs/CustomSearch";
import { UsersTable } from "../components/UsersTable";
import { useUsers } from "../hooks/users.api";

const useStyles = createStyles((theme) => ({
  actionCard: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    textAlign: "center",
    borderRadius: theme.radius.md,
    boxShadow: "0 0 40px 0 rgba(94,92,154,.06)",
  },
  title: { fontSize: "1.625rem", fontWeight: "bold" },
  category: {},
  subTitle: {
    color: "#8f91ac",
    fontSize: ".75rem",
    fontWeight: "bolder",
    textTransform: "uppercase",
  },
  cardHeader: {
    marginTop: 30,
    marginBottom: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const UsersList = () => {
  const { classes } = useStyles();
  const usersQuery = useUsers();

  if (usersQuery.isLoading) return <Loader />;
  if (usersQuery.isError) return <Text color="red">Error loading users.</Text>;

  const users = usersQuery.data || [];
  console.log("Users data in component:", users);

  return (
    <Container size="xl">
      <Grid gutter="md">
        <Grid.Col span={12}>
          <TitleSection
            title={"Users"}
            subTitle={"Manage and follow Users!"}
            classes={classes}
            rightSide={<CreateUsersModal />}
          />
        </Grid.Col>

        <Grid.Col span={12} className={classes.actionCard}>
          <Grid>
            <Grid.Col lg={4} md={4} sm={12}>
              <CustomSearch />
            </Grid.Col>
            <Grid.Col>
              <Divider />
            </Grid.Col>
            <Grid.Col pos="relative">
              <UsersTable data={users} />
            </Grid.Col>
            <Grid.Col>
              <Pagination
                total={Math.ceil(usersQuery.data?.length / 10)} // Example pagination
                color="indigo"
                position="right"
                withEdges
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default UsersList;
