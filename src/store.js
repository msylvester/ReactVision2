// // store.js
import {configureStore, createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      uid: '',
      email: '',
      permissionCamera: false,
      permissionPhotolibrary: false,
      projects: [],
    },
    project: {
      name: '',
      blocks: [],
    },
    image: {
      uri: '',
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setImageRedux: (state, action) => {
      state.image = action.payload;
    },
    clearUser: state => {
      state.user = {
        uid: '',
        email: '',
        permissionCamera: false,
        permissionPhotolibrary: false,
        projects: [],
      };
    },
    setProjectName: (state, action) => {
      state.project = action.payload;
    },
    setProject: (state, action) => {
      console.log(` and the actioin is ${JSON.stringify(action.payload)}`);
      state.project.blocks = action.payload.blocks;
    },
    updateBlocks: (state, action) => {
      state.project.blocks.push(action.payload);
    },
    setCameraPermission: (state, action) => {
      state.user.permissionCamera = action.payload;
    },
    clearCameraPermission: state => {
      state.user.permissionCamera = false;
    },
  },
});

export const {
  setUser,
  clearUser,
  setCameraPermission,
  clearCameraPermission,
  setImageRedux,
  updateBlocks,
  setProjectName,
  setProject,
} = userSlice.actions;

export const selectUser = state => state.user.user;
export const selectImage = state => state.user.image;
export const selectProject = state => state.user.project;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    // Add other reducers if needed
  },
});

// import {configureStore, createSlice} from '@reduxjs/toolkit';
// //create an image atribute
// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     user: {
//       uid: '',
//       email: '',
//       permissionCamera: false,
//       permissionPhotolibrary: false,
//       projects: [],
//     },
//     project: {
//       name: '',
//       blocks: [],
//     },
//     image: {
//       uri: '',
//     },
//   },
//   reducers: {
//     setUser: (state, action) => {
//       console.log(`imside user and ${JSON.stringify(action.payload)}`);
//       state.user = action.payload;
//     },
//     setImageRedux: (state, action) => {
//       console.log(`inside set image ${JSON.stringify(action.payload)}`);
//       state.image = action.payload;
//     },
//     clearUser: state => {
//       state.user = null;
//     },
//     setProjectName: (state, action) => {
//       console.log(
//         `here is the state:${JSON.stringify(
//           state,
//         )} and te action: ${JSON.stringify(action)}`,
//       );
//       state.project = action.payload;
//     },
//     updateBlocks: (state, action) => {
//       let {
//         project: {blocks},
//       } = state;
//       const {payload} = action;
//       blocks.push(payload);
//       console.log(
//         `her eis the state ${JSON.stringify(
//           blocks,
//         )}, and action ${JSON.stringify(action)}`,
//       );
//       state.project.blocks = blocks;
//     },
//     //send true
//     setCameraPermission: (state, action) => {
//       console.log(
//         `inside setCameraPermission AND ${JSON.stringify(action.payload)}`,
//       );
//       state.user = action.payload;
//     },
//     clearCameraPermission: state => {
//       state.permissionCamera = false;
//     },
//   },
// });

// export const {
//   setUser,
//   updateProjects,
//   clearUser,
//   setCameraPermission,
//   clearCameraPermission,
//   setImageRedux,
//   updateBlocks,
//   setProjectName,
// } = userSlice.actions;

// export const selectUser = state => state.user.user;
// export const selectImage = state => state.user.image;
// export const selectProject = state => state.user.project;
// export const store = configureStore({
//   reducer: {
//     user: userSlice.reducer,
//     // Add other reducers if needed
//   },
// });
