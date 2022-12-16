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
import { PrivatedRouteReAuth, PrivatedRoute } from "./utils/PrivateRoute";

import App from "./App";
// import Pokemon, { pokemonLoader } from "./Pokemon";
import CreatePost from "./components/blog/CreatePost";
import MyPost from "./components/blog/MyPost";
import Blogs from "./components/blog/Blogs";
import Error from "./Error";
import Post, { blogLoader } from "./components/blog/Post";
import EditPost, { postLoader } from "./components/blog/EditPost";
import EditUsers from "./components/EditUsers";
import Profile from "./components/Profile";

const JSXRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<App />}
      errorElement={<Error />}
      // loader={rootLoader}
      path="/"
    >
      <Route element={<PrivatedRoute />}>
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/myPost" element={<MyPost />} />
        <Route path="/dodajPost" element={<CreatePost />} />
        <Route path="/reAuth" element={<ReAuth />} />
        <Route path="/editUsers" element={<EditUsers />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Blogs />} />
      {/* <Route path="/editUsers2" element={<EditUsers2 />} /> */}
      <Route element={<PrivatedRouteReAuth />}>
        <Route path="/accountSettings" element={<AccountSettings />} />
        <Route path="/changeEmail" element={<ChangeEmail />} />
        <Route path="/delateAccount" element={<DeleteAccount />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <>
      <QueryClientProvider client={queryClient} />
      <RouterProvider router={JSXRouter} />
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
