import React, { ReactNode } from "react";
import { Title } from "@mantine/core";

type StyleClassesProp = {
  cardHeader: string;
  subTitle: string;
  title: string;
};
type TitleSectionProps = {
  classes: StyleClassesProp;
  title: string;
  subTitle?: string;
  rightSide?: ReactNode;
};

const defaultProps: Partial<TitleSectionProps> = {
  rightSide: null,
};

const TitleSection = (props: TitleSectionProps) => {
  const mergedProps = { ...defaultProps, ...props };
  return (
    <div className={mergedProps.classes.cardHeader}>
      <div>
        <Title size="h4" className={mergedProps.classes.title}>
          {mergedProps.title}
        </Title>
        <Title order={3} className={mergedProps.classes.subTitle}>
          {mergedProps.subTitle}
        </Title>
      </div>
      {mergedProps.rightSide}
    </div>
  );
};

export default TitleSection;
