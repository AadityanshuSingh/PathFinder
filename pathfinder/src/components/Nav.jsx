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
import { useDispatch, useSelector } from "react-redux";
import { setVisitedNodes, setPath } from "../redux/Slices/cellSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const { visitedNodes, start, end } = useSelector((state) => state.cell);

  const handleVisualize = () => {
    for (let cell of visitedNodes) {
      const element = document.getElementById(`${cell[0]}-${cell[1]}`);
      element.style.backgroundColor = "white";
      element.style.animation = "none";
    }
    dispatch(setVisitedNodes([]));
    dispatch(setPath([]));
    const result = bfs(start, end);
    console.log("visited", result.visited);
    dispatch(setVisitedNodes(result.visited));
    dispatch(setPath(result.path));
    // console.log(result.path);
  };

  const clearBoard = () => {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 50; j++) {
        const element = document.getElementById(`${i}-${j}`);
        element.style.backgroundColor = "white";
        element.style.animation = "none";
      }
    }
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
          onClick={clearBoard}
        >
          Clear Board
        </Button>
      </HStack>
    </VStack>
  );
};

export default Nav;
