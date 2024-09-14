import React from "react";
import { IconTrash, IconPencil } from "@tabler/icons-react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  createStyles,
  px,
  rem,
  useMantineTheme,
  ScrollArea,
  Table,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import TitleSection from "../components/TitleSection";
import { useState } from "react";
import DeleteService from "../components/deleteService";

const BASE_HEIGHT = 600;

const useStyles = createStyles((theme) => ({
  actionCard: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    // textAlign: "center",
    borderRadius: theme.radius.md,
    boxShadow: "0 0 40px 0 rgba(94,92,154,.06)",
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
  subTitle2: {
    display: "block",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),
    fontWeight: 600,
  },

  link: {
    display: "block",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
    fontWeight: 600,
  },
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
  fullWidthTable: {
    width: "100%",
    minWidth: 800,
  },
}));

const getChild = (height: number) => (
  <Skeleton height={height} radius="md" animate={true} />
);
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);
const serviceStatus: Record<string, string> = {
  live: "green",
  suspended: "Gray",
  pending: "orange",
  blocked: "red",
  development: "grape",
};
const serviceType: Record<string, string> = {
  purchase: "yellow",
  subscription: "blue",
};
interface IDataTableType {
  id: number;
  name: string;
  description: string;
  providerType: string;
  subscriptionType: string;
  status: string;
  logo: string;
}
const data: IDataTableType[] = [
  {
    id: 1,
    name: "Service1",
    description: "Service1 description",
    providerType: "service-provider",
    subscriptionType: "subscription-provider",
    status: "active",
    logo: "logo",
  },
  {
    id: 2,
    name: "Service2",
    description: "Service2 description",
    providerType: "service2-provider",
    subscriptionType: "subscription2-provider",
    status: "inactive",
    logo: "logo2",
  },
];

const UsersDetails = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [scrolled, setScrolled] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | undefined>(
    undefined
  );
  const openDeleteModal = (itemId: number) => {
    setDeleteItemId(itemId);
    setDeleteModalOpened(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpened(false);
    setDeleteItemId(undefined);
  };

  const handleDeleteItem = () => {
    closeDeleteModal();
  };
  const rows = data.map((item) => {
    return (
      <tr key={item.name}>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.description}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.providerType}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.subscriptionType}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.status}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.logo}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon>
              <Tooltip label="Edit">
                <IconPencil size="1.2rem" stroke={1.5} />
              </Tooltip>
            </ActionIcon>
            <ActionIcon onClick={() => openDeleteModal(item.id)}>
              <Tooltip label="Delete">
                <IconTrash size="1.2rem" stroke={1.5} />
              </Tooltip>
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });
  return (
    <Container size="xl">
      <Grid gutter="md">
        <Grid.Col span={12}>
          <TitleSection title={"Aggregator Details"} classes={classes} />
        </Grid.Col>
        <Grid.Col lg={8} md={12} sm={12}>
          <Grid.Col lg={12} md={12} sm={12}>
            <SimpleGrid
              className={classes.actionCard}
              style={{
                height: BASE_HEIGHT,
              }}
            >
              <Stack>
                <Group position="apart">
                  <Text className={classes.title}>Aggregator</Text>
                  <Button variant="outline" radius="sm">
                    View
                  </Button>
                </Group>

                <Divider my="sm" />
                <Group position="apart">
                  <Text className={classes.subTitle2}>Name:</Text>
                  <Text className={classes.subTitle2}>Name</Text>
                </Group>

                <Divider my="sm" />
                <Group position="apart">
                  <Text className={classes.subTitle2}>Email</Text>
                  <Text className={classes.link}>Aggregator Email</Text>
                </Group>
                <Divider my="sm" />
                <Group position="apart">
                  <Text className={classes.subTitle2}>Password</Text>
                  <Text className={classes.link}>Aggregator Password</Text>
                </Group>
                <Divider my="sm" />
                <Group position="apart">
                  <Text className={classes.subTitle2}>Aggregator_Name:</Text>
                  <Text className={classes.subTitle2}>Aggregator Name</Text>
                </Group>
                <Divider my="sm" />
                <Group position="apart">
                  <Text className={classes.subTitle2}>Description:</Text>
                  <Text className={classes.subTitle2}>
                    Aggregator Description
                  </Text>
                </Group>
                <Divider my="sm" />
                <Group position="apart">
                  <Text className={classes.subTitle2}>User:</Text>
                  <Text className={classes.subTitle2}>Ali</Text>
                </Group>
              </Stack>
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col lg={12} md={12} sm={12}>
            <SimpleGrid className={classes.actionCard}>
              <Stack>
                <Group position="apart">
                  <Text className={classes.title}>Service</Text>
                </Group>
                <ScrollArea
                  h={400}
                  onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
                >
                  <Table
                    verticalSpacing="sm"
                    className={classes.fullWidthTable}
                  >
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Description</th>
                        <th style={{ textAlign: "center" }}>Provider Type</th>

                        <th style={{ textAlign: "center" }}>
                          Subscription Type
                        </th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Logo</th>

                        <th style={{ textAlign: "center" }}>Action</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                  </Table>
                  <DeleteService
                    opened={deleteModalOpened}
                    onClose={closeDeleteModal}
                    onDelete={handleDeleteItem}
                  />
                </ScrollArea>
              </Stack>
            </SimpleGrid>
          </Grid.Col>
        </Grid.Col>
        <Grid.Col lg={4} md={12} sm={12}>
          <Grid.Col lg={12} md={12} sm={12}>
            <SimpleGrid
              className={classes.actionCard}
              style={{
                height: getSubHeight(1.5, px(theme.spacing.md)),
              }}
            >
              <Stack>
                <Group position="apart">
                  <Text className={classes.title}>Provider Company</Text>
                </Group>

                <Group position="apart">
                  <Text className={classes.subTitle2}>
                    Tax Identification Number
                  </Text>
                  <Text className={classes.subTitle2}>17630Y/P</Text>
                </Group>

                <Group position="apart">
                  <Text className={classes.subTitle2}>Legal form</Text>
                  <Text className={classes.subTitle2}>SARL</Text>
                </Group>

                <Group position="apart">
                  <Text className={classes.subTitle2}>Start Date</Text>
                  <Text className={classes.subTitle2}>Sun, May 7, 2023</Text>
                </Group>
              </Stack>
            </SimpleGrid>
          </Grid.Col>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default UsersDetails;
