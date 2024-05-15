import { Box, Card, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import startRightSvg from "../assets/triangletwo-right.svg";
import startLeftSvg from "../assets/triangletwo-left.svg";
import startUpSvg from "../assets/triangletwo-up.svg";
import startDownSvg from "../assets/triangletwo-down.svg";
import endSvg from "../assets/circle.svg";
import { setEnd, setStart } from "../redux/Slices/cellSlice";

const GridMesh = () => {
  const rows = [];
  const [startNode, setStartNode] = useState(false);
  const [endNode, setEndNode] = useState(false);
  const { start, end } = useSelector((state) => state.cell);
  const dispatch = useDispatch();

  const startImg =
    end[1] > start[1]
      ? startRightSvg
      : end[1] < start[1]
      ? startLeftSvg
      : end[0] > start[0]
      ? startDownSvg
      : startUpSvg;

  const handleClick = (e) => {
    const [row, col] = e.target.id.split("-").map((el) => parseInt(el));

    if (startNode && row === end[0] && col === end[1]) {
      return;
    } else if (startNode) {
      // console.log("start", [row, col], "end", end);
      dispatch(setStart([row, col]));
      setStartNode(false);
    }
    if (endNode && row === start[0] && col === start[1]) {
      return;
    } else if (endNode) {
      dispatch(setEnd([row, col]));
      setEndNode(false);
    }
  };

  for (let i = 0; i < 20; i++) {
    const cols = [];

    for (let j = 0; j < 50; j++) {
      cols.push(
        <Box
          key={`${i}-${j}`}
          id={`${i}-${j}`}
          w={`${100 / 50}%`}
          h={"25px"}
          bg={"white"}
          borderWidth={"thin"}
          borderColor={"blue.200"}
          onClick={handleClick}
        >
          {i === start[0] && j === start[1] ? (
            <Image
              src={startImg}
              id={`${i}-${j}`}
              w={"100%"}
              h={"100%"}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                if (!endNode) {
                  setStartNode(true);
                  dispatch(setStart([-1, -1]));
                } else {
                  return;
                }
              }}
            />
          ) : null}
          {i === end[0] && j === end[1] ? (
            <Image
              src={endSvg}
              id={`${i}-${j}`}
              w={"100%"}
              h={"100%"}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                if (!startNode) {
                  setEndNode(true);
                  dispatch(setEnd([-1, -1]));
                } else {
                  return;
                }
              }}
            />
          ) : null}
        </Box>
      );
    }

    rows.push(
      <Box key={i} display={"flex"}>
        {cols}
      </Box>
    );
  }

  const { visitedNodes, path } = useSelector((state) => state.cell);
  // console.log("path", path);

  useEffect(() => {
    let index = 1;
    for (let cell of visitedNodes) {
      const element = document.getElementById(`${cell[0]}-${cell[1]}`);
      setTimeout(() => {
        element.style.animation = "animateVisitedCell 1s linear";
        element.style.backgroundColor = "#4fadc1";
      }, 10 * index);
      index++;
    }

    let index2 = index;
    index = 1;
    for (let cell of path) {
      const element = document.getElementById(`${cell[0]}-${cell[1]}`);
      setTimeout(() => {
        element.style.backgroundColor = "#c572ff";
      }, 10 * index2 + 100 * index);
      index++;
    }
  }, [visitedNodes, path]);

  return (
    <Box w={"100%"} mt={5} mb={4} pl={4} pr={4}>
      {rows}
    </Box>
  );
};

export default GridMesh;
