import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";

import { rightAnswer } from "./constants";
import { generateTicTacToeValue } from "./helper";
import PageDraw from "./page/PageDraw";
import PageFinish from "./page/PageFinish";
import PagePlaying from "./page/PagePlaying";
import { SelectedDataProps } from "./types";

const App = () => {
  const [blockData, setBlockData] = useState<number[]>([]);
  const [winnerName, setWinnerName] = useState<"x" | "o">("x");
  const [isGame, setIsGame] = useState<boolean | null>(null);
  const [stateStatus, setStateStatus] = useState<"x" | "o">("x");
  const [selectedData, setSelectedData] = useState<SelectedDataProps>({});

  useEffect(() => {
    checkAnswer();
  }, [selectedData]);

  useEffect(() => {
    const result = generateTicTacToeValue();
    setBlockData(result as number[]);
  }, []);

  const onSelectCard = (index: number, status: string | null) => {
    if (!status) {
      const newObjectData = { ...selectedData, [index]: stateStatus };
      setStateStatus(stateStatus === "x" ? "o" : "x");
      setSelectedData(newObjectData);
    }
  };

  const sortingAnswer = () => {
    let answer = { x: "", o: "" };
    Object.entries(selectedData)
      .sort(([, a]: any, [, b]: any) => a - b)
      .map((item) => {
        if (item[1] === "x") {
          const copyXvalue = answer.x + item[0];
          answer.x = copyXvalue;
        } else if (item[1] === "o") {
          const copyOvalue = answer.o + item[0];
          answer.o = copyOvalue;
        }

        return null;
      });
    return answer;
  };

  const checkAnswer = () => {
    // TODO Change any type
    const resultSorting = sortingAnswer();
    if (resultSorting) {
      Object.entries(resultSorting).map((obEntries) => {
        console.log("obEntries ", obEntries);
        let winner_array = [];
        rightAnswer.map((righAnsw) => {
          righAnsw.split("").map((childRigthAnsw) => {
            if (obEntries[1].includes(childRigthAnsw)) {
              winner_array.push(true);
            } else {
              winner_array = [];
            }
          });
          if (
            winner_array.length >= 3 &&
            Object.keys(resultSorting).length >= 3
          ) {
            const winnerText = obEntries[0] as "x" | "o";
            setWinnerName(winnerText);
            setIsGame(true);
          } else if (
            winner_array.length < 3 &&
            Object.keys(resultSorting).length >= 3
          ) {
            console.log("jalan ");
            setIsGame(false);
          } else {
            setIsGame(null);
          }
        });
      });
    }
  };

  const onReset = () => {
    const result = generateTicTacToeValue();
    setBlockData(result as number[]);
    setIsGame(null);
    setStateStatus("x");
    setSelectedData({});
  };

  console.log(" isGame", isGame);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isGame === true ? (
          // TODO Winner Name
          <PageFinish status={winnerName} onClick={onReset} />
        ) : isGame === false ? (
          <PageDraw onClick={onReset} />
        ) : isGame === null ? (
          <PagePlaying
            data={blockData}
            selectedData={selectedData}
            onSelectCard={onSelectCard}
          />
        ) : null}
      </div>
    </div>
  );
};

export default App;
