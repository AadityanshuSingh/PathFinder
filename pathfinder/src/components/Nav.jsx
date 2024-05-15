import {
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import logo from "../assets/image.png";
import React from "react";
import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";
import { useDispatch, useSelector } from "react-redux";
import {
  setVisitedNodes,
  setPath,
  setEditWall,
  setEditWeight,
  eraseWall,
  eraseWeight,
  setEraseWall,
} from "../redux/Slices/cellSlice";
import { setAlgorithm } from "../redux/Slices/algoSlice";
import Dijkstra from "../algorithms/Dijkstra";

const Nav = () => {
  const dispatch = useDispatch();
  const { visitedNodes, start, end, walls } = useSelector(
    (state) => state.cell
  );
  const { algorithm } = useSelector((state) => state.algo);

  const handleVisualize = () => {
    for (let cell of visitedNodes) {
      const element = document.getElementById(`${cell[0]}-${cell[1]}`);
      element.style.backgroundColor = "white";
      element.style.animation = "none";
    }
    dispatch(setEditWall(false));
    dispatch(setEditWeight(false));
    dispatch(setEraseWall(false));
    dispatch(setVisitedNodes([]));
    dispatch(setPath([]));
    console.log(walls);
    const wallNode = new Set();
    for (let wall of walls) {
      wallNode.add(`${wall.row}-${wall.col}`);
    }
    const result =
      algorithm === "DFS"
        ? dfs(start, end, wallNode)
        : algorithm === "BFS"
        ? bfs(start, end, wallNode)
        : algorithm === "Dijkstra"
        ? Dijkstra(start, end, wallNode)
        : { visited: [], path: [] };
    console.log("visited", result.visited);
    dispatch(setVisitedNodes(result.visited));
    dispatch(setPath(result.path));
    // console.log(result.path);
  };

  const clearWalls = () => {
    for (let wall of walls) {
      const element = document.getElementById(`${wall.row}-${wall.col}`);
      element.style.backgroundColor = "white";
      element.style.animation = "none";
    }
    dispatch(setEditWall(false));
    dispatch(setEditWeight(false));
    dispatch(setEraseWall(false));
    dispatch(eraseWall());
  };

  const eraseWalls = () => {
    dispatch(setEditWall(false));
    dispatch(setEditWeight(false));
    dispatch(setEraseWall(true));
  };

  const clearBoard = () => {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 50; j++) {
        const element = document.getElementById(`${i}-${j}`);
        element.style.backgroundColor = "white";
        element.style.animation = "none";
      }
    }
    dispatch(setEditWall(false));
    dispatch(setEditWeight(false));
    dispatch(eraseWall());
    dispatch(eraseWeight());
    dispatch(setEraseWall(false));
    dispatch(setVisitedNodes([]));
    dispatch(setPath([]));
  };
  return (
    <VStack w={"100%"} bg={"gray.800"} pl={2}>
      <HStack w={"100%"} ml={0} mt={2}>
        <Image
          src={logo}
          height={"50px"}
          w={"50px"}
          ml={0}
          borderRadius={"full"}
        />
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
      </HStack>
      <HStack w={"100%"} mb={4} pl={4}>
        {/* Algorithms */}
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
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.700" }}
              onClick={() => {
                dispatch(setAlgorithm("Dijkstra"));
              }}
            >
              Dijkstra's Algorithm
            </MenuItem>
            <MenuItem bg={"gray.600"} _hover={{ bg: "gray.700" }}>
              A* Algorithm
            </MenuItem>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.700" }}
              onClick={() => {
                dispatch(setAlgorithm("BFS"));
              }}
            >
              Breadth First Search
            </MenuItem>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.700" }}
              onClick={() => {
                dispatch(setAlgorithm("DFS"));
              }}
            >
              Depth First Search
            </MenuItem>
          </MenuList>
        </Menu>
        {/* Mazes & Patterns */}
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
        {/* Walls & Weights */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={"inherit"}
            _hover={{ bg: "purple.600" }}
            _active={{ bg: "purple.600" }}
            color={"gray.300"}
          >
            Walls & Weights
          </MenuButton>
          <MenuList color={"gray.300"} bg={"gray.600"} border={0}>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.800" }}
              onClick={() => {
                dispatch(setEditWall(true));
                dispatch(setEditWeight(false));
              }}
            >
              Add Walls
            </MenuItem>
            <MenuItem bg={"gray.600"} _hover={{ bg: "gray.800" }}>
              Add Weights
            </MenuItem>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.800" }}
              onClick={clearWalls}
            >
              Clear Walls
            </MenuItem>
            <MenuItem bg={"gray.600"} _hover={{ bg: "gray.800" }}>
              Clear Weights
            </MenuItem>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.800" }}
              onClick={eraseWalls}
            >
              Erase Walls
            </MenuItem>
            <MenuItem bg={"gray.600"} _hover={{ bg: "gray.800" }}>
              Erase Weights
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
          onClick={clearBoard}
        >
          Clear Board
        </Button>
      </HStack>
    </VStack>
  );
};

export default Nav;
