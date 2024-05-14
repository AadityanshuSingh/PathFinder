import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import bfs from "../algorithms/bfs";
import { useDispatch, useSelector } from "react-redux";
import { setVisitedNodes, setPath } from "../redux/Slices/cellSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const { visitedNodes } = useSelector((state) => state.cell);

  const handleVisualize = () => {
    for (let cell of visitedNodes) {
      const element = document.getElementById(`${cell[0]}-${cell[1]}`);
      element.style.backgroundColor = "white";
      element.style.animation = "none";
    }
    dispatch(setVisitedNodes([]));
    dispatch(setPath([]));
    const result = bfs([10, 30], [4, 46]);
    console.log("visited", result.visited);
    dispatch(setVisitedNodes(result.visited));
    dispatch(setPath(result.path));
    // console.log(result.path);
  };
  return (
    <VStack w={"100%"} bg={"gray.800"} pl={2}>
      <Text
        w={"100%"}
        fontSize={"xx-large"}
        fontWeight={"extrabold"}
        as={"b"}
        bgGradient="linear(to-b, purple.100, purple.600)"
        bgClip={"text"}
        mt={1}
        mb={2}
      >
        Pathfinder
      </Text>
      <HStack w={"100%"} mb={4} pl={4}>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={"inherit"}
            _hover={{ bg: "purple.600" }}
            _active={{ bg: "purple.600" }}
            color={"gray.300"}
          >
            Algorithms
          </MenuButton>
          <MenuList color={"gray.300"} bg={"gray.600"} border={0}>
            <MenuItem bg={"gray.600"} _hover={{ bg: "gray.700" }}>
              Dijkstra's Algorithm
            </MenuItem>
            <MenuItem bg={"gray.600"} _hover={{ bg: "gray.700" }}>
              A* Algorithm
            </MenuItem>
            <MenuItem bg={"gray.600"} _hover={{ bg: "gray.700" }}>
              Breadth First Search
            </MenuItem>
            <MenuItem bg={"gray.600"} _hover={{ bg: "gray.700" }}>
              Depth First Search
            </MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={"inherit"}
            _hover={{ bg: "purple.600" }}
            _active={{ bg: "purple.600" }}
            color={"gray.300"}
          >
            Mazes & Patterns
          </MenuButton>
          <MenuList color={"gray.300"} bg={"gray.600"} border={0}>
            <MenuItem bg={"gray.600"} _hover={{ bg: "gray.700" }}>
              Recursive Division
            </MenuItem>
            <MenuItem bg={"gray.600"} _hover={{ bg: "gray.700" }}>
              Basic Random Maze
            </MenuItem>
            <MenuItem bg={"gray.600"} _hover={{ bg: "gray.700" }}>
              Basic Weighted Maze
            </MenuItem>
          </MenuList>
        </Menu>
        <Button
          bg={"purple.300"}
          _hover={{ bg: "purple.500", color: "gray.300" }}
          onClick={handleVisualize}
        >
          Visualize
        </Button>
        <Button
          bg={"inherit"}
          _hover={{ color: "purple.500", bg: "inherit" }}
          color={"gray.300"}
        >
          Clear Board
        </Button>
      </HStack>
    </VStack>
  );
};

export default Nav;
