import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Menu,
  Progress,
  createStyles,
  rem,
  Tooltip,
} from "@mantine/core";
import {
  IconDots,
  IconEye,
  IconEyeOff,
  IconFolderBolt,
  IconHelp,
  IconMessages,
  IconNote,
  IconPencil,
  IconReportAnalytics,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Marketplace {
  id: bigint;
  name: string;
  description: string;
  website: string;
  logo: string;
  operator_id: bigint;
  created_at: Date;
  updated_at: Date;
}

interface ServiceProvider {
  id: bigint;
  name: string;
  description: string;
  user_id: bigint;
  created_at: Date;
  updated_at: Date;
}

interface Status {
  id: bigint;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

interface SubscriptionType {
  id: bigint;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

const jobColors: Record<string, string> = {
  live: "green",
  suspended: "Gray",
  pending: "orange",
  blocked: "red",
  development: "grape",
};

const useStyles = createStyles((theme) => ({
  scrolled: {
    boxShadow: theme.shadows.sm,
  },
  header: {
    zIndex: 100,
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

interface UsersTableProps {
  data: {
    id: bigint;
    name: string;
    description: string;
    logo: string;
    marketplace: Marketplace;
    request_step: Array<object>;
    provider: ServiceProvider;
    status: Status;
    subscription_type: SubscriptionType;
    type: string;
    created_at: Date;
    updated_at: Date;
    // protalUrl: string;
    // status: string;
    // requestSteps: { completed: number; incomplete: number };
    // listingStatus: boolean;
  }[];
}

export function ServicesTable({ data }: UsersTableProps) {
  const { classes, theme, cx } = useStyles();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const rows = data.map((item) => {
    // const totalRequestSteps =
    //   item.requestSteps.completed + item.requestSteps.incomplete;
    // const positiveRequestSteps =
    //   (item.requestSteps.completed / totalRequestSteps) * 100;
    // const negativeRequestSteps =
    //   (item.requestSteps.incomplete / totalRequestSteps) * 100;
    const logos = JSON.parse(item.logo);
    return (
      <tr key={item.name}>
        <td>
          <Group spacing="sm">
            <Avatar
              size={30}
              src={`http://localhost:8000/${logos[0]}`}
              radius={30}
            />
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>
          <Anchor component="button" size="sm">
            {item.marketplace.name}
          </Anchor>
        </td>
        <td>
          <Badge
            color={jobColors[item.status.name.toLowerCase()]}
            variant="filled"
          >
            {item.status.name}
          </Badge>
        </td>
        {/* <td>
          <Group position="apart">
            <Text fz="xs" c="teal" weight={700}>
              {positiveRequestSteps.toFixed(0)}%
            </Text>
            <Text fz="xs" c="red" weight={700}>
              {negativeRequestSteps.toFixed(0)}%
            </Text>
          </Group>
          <Progress
            classNames={{ bar: classes.progressBar }}
            sections={[
              {
                value: positiveRequestSteps,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.teal[9]
                    : theme.colors.teal[6],
              },
              {
                value: negativeRequestSteps,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.red[9]
                    : theme.colors.red[6],
              },
            ]}
          />
        </td> */}
        <td>
          {item.status.name.toLowerCase() === "live" ? (
            <Badge fullWidth>Listed</Badge>
          ) : (
            <Badge color="gray" fullWidth>
              Hidden
            </Badge>
          )}
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon onClick={() => navigate(`/services/${item.id}`)}>
              <Tooltip label="Details">
                <IconEye size="1.2rem" stroke={1.5} />
              </Tooltip>
            </ActionIcon>
            <ActionIcon>
              <Tooltip label="Edit">
                <IconPencil size="1.2rem" stroke={1.5} />
              </Tooltip>
            </ActionIcon>
            <ActionIcon>
              <Tooltip label="Edit">
                <IconFolderBolt size="1.2rem" stroke={1.5} />
              </Tooltip>
            </ActionIcon>
            {/* <Menu
              transitionProps={{ transition: "pop" }}
              withArrow
              position="bottom-end"
              withinPortal
            >
              <Menu.Target>
                <ActionIcon>
                  <IconDots size="1rem" stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconPencil size="1rem" stroke={1.5} />}>
                  Edit Service
                </Menu.Item>
                <Menu.Item
                  icon={<IconReportAnalytics size="1rem" stroke={1.5} />}
                >
                  More Details
                </Menu.Item>
                <Menu.Item icon={<IconFolderBolt size="1rem" stroke={1.5} />}>
                  Manage Documents
                </Menu.Item>
              </Menu.Dropdown>
            </Menu> */}
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea
      h={400}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Service
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Portal URL
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Status
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Listing Status
            </th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
