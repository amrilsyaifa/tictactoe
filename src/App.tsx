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
  const [isGame, setIsGame] = useState<boolean>(false);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [stateStatus, setStateStatus] = useState<"x" | "o">("x");
  const [selectedData, setSelectedData] = useState<SelectedDataProps>({});
  const [count, setCount] = useState<number>(0);

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
      setCount(count + 1);
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
        rightAnswer.map((righAnsw) => {
          if (obEntries[1].includes(righAnsw)) {
            setIsGame(true);
            const winnerText = obEntries[0] as "x" | "o";
            setWinnerName(winnerText);
          }
        });
      });
      if (count === 9 && !isGame) {
        setIsDraw(true);
      }
    }
  };

  const onReset = () => {
    const result = generateTicTacToeValue();
    setBlockData(result as number[]);
    setIsGame(false);
    setIsDraw(false);
    setStateStatus("x");
    setSelectedData({});
    setCount(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isGame && !isDraw && (
          <PageFinish status={winnerName} onClick={onReset} />
        )}
        {!isGame && isDraw && <PageDraw onClick={onReset} />}
        {!isGame && !isDraw && (
          <PagePlaying
            data={blockData}
            selectedData={selectedData}
            onSelectCard={onSelectCard}
          />
        )}
      </div>
    </div>
  );
};

export default App;
