import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Register from "./components/users/Register";
import Login from "./components/users/Login";
import AccountSettings from "./components/users/setings/AccountSettings";
import ChangePassword from "./components/users/setings/ChangePassword";
import ReAuth from "./components/users/setings/ReAuth";
import ChangeEmail from "./components/users/setings/ChangeEmail";
import DeleteAccount from "./components/users/setings/DeleteAccount";
import { PrivatedRoute } from "./utils/PrivateRoute";

import App, { rootLoader } from "./App";
import Pokemon, { pokemonLoader } from "./Pokemon";
import CreatePost from "./components/blog/CreatePost";
import MyPost from "./components/blog/MyPost";
import Blogs from "./components/blog/Blogs";
import Error from "./Error";
import Post, { blogLoader } from "./components/blog/Post";
import EditPost, { postLoader } from "./components/blog/EditPost";
import EditUsers from "./components/EditUsers";
import Profile from "./components/Profile";
import EditUsers2 from "./components/EditUsers2";
const JSXRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<App />}
      errorElement={<Error />}
      // loader={rootLoader}
      path="/"
    >
      <Route
        element={<Pokemon />}
        errorElement={<Error />}
        loader={pokemonLoader}
        path="pokemon/:name"
      />
      <Route
        element={<Post />}
        errorElement={<Error />}
        loader={blogLoader}
        path="post/:id"
      />
      <Route
        element={<EditPost />}
        errorElement={<Error />}
        loader={postLoader}
        path="editPost/:post"
      />
      <Route path="/" element={<Blogs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/myPost" element={<MyPost />} />
      <Route path="/dodajPost" element={<CreatePost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reAuth" element={<ReAuth />} />
      <Route path="/editUsers" element={<EditUsers />} />
      <Route path="/editUsers2" element={<EditUsers2 />} />
      <Route element={<PrivatedRoute />}>
        <Route path="/accountSettings" element={<AccountSettings />} />
        <Route path="/changeEmail" element={<ChangeEmail />} />
        <Route path="/delateAccount" element={<DeleteAccount />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Route>
      {/* <Route element={<Root />} path="/root">
      </Route> */}
    </Route>
  )
);

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    {/* <App /> */}
    <>
      <QueryClientProvider client={queryClient} />
      <RouterProvider router={JSXRouter} />
      {/* </RouterProvider> */}
    </>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
