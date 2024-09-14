import React, { useState } from "react";
import {
  Container,
  Grid,
  createStyles,
  Divider,
  Pagination,
} from "@mantine/core";
import TitleSection from "../components/TitleSection";
import CreateProductsModal from "../components/CreateProductsModal";
import { CustomSearch } from "../../../components/inputs/CustomSearch";
import { ProductsTable } from "../components/ProductsTable";

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

const ProductsList = () => {
  const { classes } = useStyles(); // fix for useStyles
  console.log(classes);
  const [productId, setProductId] = useState("defaultProductId");

  return (
    <Container size="xl">
      <Grid gutter="md">
        <Grid.Col span={12}>
          <TitleSection
            title={"Products"}
            subTitle={"Manage and follow Products!"}
            classes={classes}
            rightSide={<CreateProductsModal />}
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
              <ProductsTable productId={productId} />
            </Grid.Col>
            <Grid.Col>
              <Pagination total={5} color="indigo" position="right" withEdges />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ProductsList;
