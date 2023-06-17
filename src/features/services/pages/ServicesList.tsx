import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  Container,
  Divider,
  Grid,
  LoadingOverlay,
  Pagination,
  ScrollArea,
  createStyles,
} from "@mantine/core";
import { ServicesTable } from "../components/ServicesTable";
import TitleSection from "../components/TitleSection";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import CreateServiceModal from "../components/CreateServiceModal";
import { CustomSearch } from "@/components/inputs/CustomSearch";
import { useServices } from "../hooks/service.api";

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
const initialState = [
  {
    logo: "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Service 1",
    status: "development",
    protalUrl: "https://example.xyz",
    listingStatus: false,
    requestSteps: { completed: 3, incomplete: 2 },
  },
  {
    logo: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Service 2",
    status: "live",
    protalUrl: "https://example.xyz",
    listingStatus: true,
    requestSteps: { completed: 5, incomplete: 0 },
  },
  {
    logo: "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Service 3",
    status: "suspended",
    protalUrl: "https://example.xyz",
    listingStatus: false,
    requestSteps: { completed: 3, incomplete: 2 },
  },
  {
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Service 4",
    status: "pending",
    protalUrl: "https://example.xyz",
    listingStatus: false,
    requestSteps: { completed: 3, incomplete: 2 },
  },
  {
    logo: "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Service 5",
    status: "blocked",
    protalUrl: "https://example.xyz",
    listingStatus: false,
    requestSteps: { completed: 3, incomplete: 2 },
  },
];

function ServicesList() {
  const { classes } = useStyles();
  const servicesQuery = useServices();
  const services = servicesQuery?.data;

  const [selectedTab, setSelectedTab] = useState("all-services");
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState(initialState);

  const handleTabChange = async (tabName: string) => {
    setVisible(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    setVisible(false);
    if (tabName !== "all-services") {
      const filteredData = data.filter((item) => item.status === "pending");
      setData(filteredData);
    } else {
      setData(initialState);
    }
    setSelectedTab(tabName);
  };
  return (
    <Container size="xl">
      <Grid gutter="md">
        <Grid.Col span={12}>
          <TitleSection
            title={"Services"}
            subTitle={"Manage and follow all services!"}
            classes={classes}
            rightSide={<CreateServiceModal />}
          />
        </Grid.Col>
        <Grid.Col span={12} className={classes.actionCard}>
          <Grid>
            {/* <Grid.Col lg={6} md={4} sm={12}>
              <Button.Group>
                <Button
                  variant={
                    selectedTab === "all-services" ? "filled" : "default"
                  }
                  onClick={() => handleTabChange("all-services")}
                >
                  All Services
                </Button>
                <Button
                  variant={
                    selectedTab === "pending-approval" ? "filled" : "default"
                  }
                  onClick={() => handleTabChange("pending-approval")}
                >
                  Pending Approval
                </Button>
              </Button.Group>
            </Grid.Col> */}

            <Grid.Col lg={4} md={4} sm={12}>
              <CustomSearch
                handleOnClick={() => handleTabChange("all-services")}
              />
            </Grid.Col>
            <Grid.Col>
              <Divider />
            </Grid.Col>
            <Grid.Col pos="relative">
              <LoadingOverlay
                visible={servicesQuery.isLoading}
                overlayBlur={2}
              />
              {servicesQuery.isSuccess && (
                <ServicesTable
                  {...{
                    data: services?.data,
                  }}
                />
              )}
            </Grid.Col>
            <Grid.Col>
              <Pagination total={5} color="indigo" position="right" withEdges />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default ServicesList;
