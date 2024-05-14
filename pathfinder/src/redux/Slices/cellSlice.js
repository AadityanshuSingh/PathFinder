import { createSlice } from "@reduxjs/toolkit";

export const cellSlice = createSlice({
  name: "cell",
  initialState: {
    start: null,
    end: null,
    walls: [],
    weights: [],
    visitedNodes: [],
    path: [],
  },
  reducers: {
    setStart: (state, action) => {
      state.start = action.payload;
    },
    setEnd: (state, action) => {
      state.end = action.payload;
    },
    addWall: (state, action) => {
      state.walls.push(action.payload);
    },
    removeWall: (state, action) => {
      state.walls = state.walls.filter((wall) => wall !== action.payload);
    },
    addWeight: (state, action) => {
      state.weights.push(action.payload);
    },
    removeWeight: (state, action) => {
      state.weights = state.weights.filter(
        (weight) => weight !== action.payload
      );
    },
    setVisitedNodes: (state, action) => {
      state.visitedNodes = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const {
  addWall,
  removeWall,
  addWeight,
  removeWeight,
  setStart,
  setEnd,
  setVisitedNodes,
  setPath,
} = cellSlice.actions;

export default cellSlice.reducer;
