import React from "react";
import {
  IconGitBranch,
  IconGitPullRequest,
  IconGitCommit,
  IconMessageDots,
  IconCheck,
  IconClockStop,
  IconPackage,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import {
  Avatar,
  Badge,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Timeline,
  createStyles,
  px,
  rem,
  useMantineTheme,
} from "@mantine/core";
import TitleSection from "../components/TitleSection";
import { MenuButton } from "@/components/buttons/MenuButton";
import { useParams } from "react-router-dom";
import { useGetService } from "../hooks/service.api";

const BASE_HEIGHT = 360;

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
const ServiceDetails = () => {
  const { classes } = useStyles();
  const { serviceId } = useParams();
  const serviceQuery = useGetService(serviceId);
  const service = serviceQuery?.data;
  const serviceLogo = serviceQuery?.isSuccess
    ? JSON.parse(service?.logo)[0]
    : "";
  const theme = useMantineTheme();
  return (
    <Container size="xl">
      <Grid gutter="md">
        <Grid.Col span={12}>
          <TitleSection title={"Service Details"} classes={classes} />
        </Grid.Col>
        <Grid.Col lg={8} md={12} sm={12}>
          <Grid.Col lg={12} md={12} sm={12}>
            <SimpleGrid
              className={classes.actionCard}
              style={{
                height: BASE_HEIGHT + 60,
              }}
            >
              <Stack>
                <Group position="apart">
                  <Text className={classes.title}>Service Progress</Text>
                  <Button variant="outline" radius="sm">
                    Validate
                  </Button>
                </Group>

                <Timeline active={2} bulletSize={24} lineWidth={2}>
                  <Timeline.Item
                    bullet={<IconCheck size={12} />}
                    title="Provider Review"
                  >
                    <Text color="dimmed" size="sm">
                      Service provider created new account and has been reviewed
                      and validated
                    </Text>
                    <Text size="xs" mt={4}>
                      2 hours ago
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    bullet={<IconCheck size={12} />}
                    title="Service Review"
                  >
                    <Text color="dimmed" size="sm">
                      Step for reviewing and verifying the created service
                    </Text>
                    <Text size="xs" mt={4}>
                      52 minutes ago
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    title="Generating API"
                    bullet={<IconCheck size={12} />}
                    lineVariant="dashed"
                  >
                    <Text color="dimmed" size="sm">
                      Generating API routes ...
                    </Text>
                    <Text size="xs" mt={4}>
                      34 minutes ago
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    title="Ready"
                    bullet={<IconClockStop size={12} />}
                  >
                    <Text color="dimmed" size="sm">
                      <Text variant="link" component="span" inherit>
                        All verification steps are complete, good luck ...
                      </Text>
                    </Text>
                    <Text size="xs" mt={4}>
                      12 minutes ago
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </Stack>
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col lg={12} md={12} sm={12}>
            <SimpleGrid
              className={classes.actionCard}
              style={{
                height: BASE_HEIGHT,
              }}
            >
              <Stack>
                <Group position="apart">
                  <Text className={classes.title}>
                    Provider: {service?.provider?.name.toUpperCase()}
                  </Text>
                  <Button variant="outline" radius="sm">
                    View
                  </Button>
                </Group>

                <Divider my="sm" />
                <Group position="apart">
                  <Text className={classes.subTitle2}>Full Address:</Text>
                  <Text className={classes.subTitle2}>Sousse, Sahloul</Text>
                </Group>
                <Divider my="sm" />
                <Group position="apart">
                  <Text className={classes.subTitle2}>Focused on:</Text>
                  <Text className={classes.subTitle2}>B2C</Text>
                </Group>
                <Divider my="sm" />
                <Group position="apart">
                  <Text className={classes.subTitle2}>Website</Text>
                  <Text className={classes.link}>www.Digmaco.com</Text>
                </Group>
              </Stack>
            </SimpleGrid>
          </Grid.Col>
        </Grid.Col>
        <Grid.Col lg={4} md={12} sm={12}>
          <Grid.Col lg={12} md={12} sm={12}>
            <SimpleGrid
              className={classes.actionCard}
              style={{
                height: getSubHeight(2.5, px(theme.spacing.md)),
              }}
            >
              <Stack>
                <Group position="apart">
                  <Text className={classes.subTitle2}>Service</Text>
                  <Badge color="dark">Deactivated</Badge>
                </Group>
                <Group position="apart">
                  <Avatar
                    radius={16}
                    src={`http://localhost:8000/${serviceLogo}`}
                    alt="no image here"
                    color="indigo"
                  />
                  <Text className={classes.title}>{service?.name}</Text>
                </Group>
              </Stack>
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col lg={12} md={12} sm={12}>
            <SimpleGrid
              className={classes.actionCard}
              style={{
                height: getSubHeight(1.7, px(theme.spacing.md)),
              }}
            >
              <Stack>
                <Group position="apart">
                  <Text className={classes.title}>Details</Text>
                  <MenuButton
                    variant="outline"
                    radius="sm"
                    label="Actions"
                    items={[
                      {
                        icon: (
                          <IconEyeOff
                            size="1rem"
                            color={theme.colors.blue[6]}
                            stroke={1.5}
                          />
                        ),
                        label: "Deactivate",
                      },
                      {
                        icon: (
                          <IconEye
                            size="1rem"
                            color={theme.colors.blue[6]}
                            stroke={1.5}
                          />
                        ),
                        label: "Activate",
                      },
                    ]}
                  />
                </Group>
                <Group position="apart">
                  <Text className={classes.subTitle2}>Status:</Text>
                  <Badge
                    color={serviceStatus[service?.status?.name.toLowerCase()]}
                    variant="filled"
                  >
                    {service?.status?.name}
                  </Badge>
                </Group>
                <Group position="apart">
                  <Text className={classes.subTitle2}>Type:</Text>
                  <Text className={classes.subTitle2}>
                    <Badge
                      color={serviceType[service?.type.toLowerCase()]}
                      variant="filled"
                    >
                      {service?.type.toUpperCase()}
                    </Badge>
                  </Text>
                </Group>
                <Group position="apart">
                  <Text className={classes.subTitle2}>Created At:</Text>
                  <Text className={classes.subTitle2}>
                    {" "}
                    {service?.created_at}
                  </Text>
                </Group>
              </Stack>
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col lg={12} md={12} sm={12}>
            <SimpleGrid
              className={classes.actionCard}
              style={{
                height: getSubHeight(4, px(theme.spacing.md)),
              }}
            >
              <Stack>
                <Group position="apart">
                  <Text className={classes.title}>Total Sales: </Text>
                  <Text className={classes.subTitle2}>+3457</Text>
                </Group>
              </Stack>
            </SimpleGrid>
          </Grid.Col>
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

export default ServiceDetails;
