import React, { FC } from "react";
import styles from "./PageFinish.module.scss";
import { PageFinishProps } from "./types";

const PageFinish: FC<PageFinishProps> = ({ status, onClick }) => {
  return (
    <div className={styles.container}>
      <h5 className={styles["text-congratulation"]}>Congratulation !!!</h5>
      <h1 className={styles["text-winner"]}>{status} is the winner</h1>
      <button className={styles.button} onClick={onClick}>
        Restart Game
      </button>
    </div>
  );
};

export default PageFinish;
