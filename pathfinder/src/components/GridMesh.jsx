import { Box, Card } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../App.css";

const GridMesh = () => {
  const rows = [];

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
        ></Box>
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
