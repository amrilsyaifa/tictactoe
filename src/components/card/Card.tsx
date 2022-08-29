import React, { FC } from "react";
import styles from "./Card.module.scss";
import { CardProps } from "./types";

const Card: FC<CardProps> = ({ status, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {status && (
        <p
          className={
            status === "x" ? styles["text-status"] : styles["text-status-dark"]
          }
        >
          {status}
        </p>
      )}
    </div>
  );
};

export default Card;
