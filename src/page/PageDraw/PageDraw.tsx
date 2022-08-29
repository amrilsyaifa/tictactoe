import React, { FC } from "react";
import styles from "./PageDraw.module.scss";
import { PageDrawProps } from "./types";

const PageDraw: FC<PageDrawProps> = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <h5 className={styles["text-congratulation"]}>Draw, you are good !!!</h5>
      <button className={styles.button} onClick={onClick}>
        Restart Game
      </button>
    </div>
  );
};

export default PageDraw;
