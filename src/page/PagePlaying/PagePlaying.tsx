import React, { FC, Fragment } from "react";
import Card from "../../components/card";
import { PagePlayingProps } from "./types";

const PagePlaying: FC<PagePlayingProps> = ({
  data,
  selectedData,
  onSelectCard,
}) => {
  const renderValueStatus = (index: number) => {
    if (selectedData[index] !== undefined) {
      return selectedData[index];
    }
    return null;
  };
  return (
    <Fragment>
      {data?.map((dt) => {
        // TODO change any
        const status: any = renderValueStatus(dt);

        return (
          <Card status={status} onClick={() => onSelectCard(dt, status)} />
        );
      })}
    </Fragment>
  );
};

export default PagePlaying;
