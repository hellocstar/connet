import React from "react";
import { Redirect } from "react-router-dom";

const Community = React.lazy(() => import("./src/components/Community"));
const Event = React.lazy(() => import("./src/components/Event/Event"));
const MyCircle = React.lazy(() => import("./src/components/MyCircle/MyCircle"));
const NewEvent = React.lazy(() => import("./src/components/NewEvent/NewEvent"));
const Profile = React.lazy(() => import("./src/components/Profile/Profile"));
const Room = React.lazy(() => import("./src/components/Room/Room"));
const SignIn = React.lazy(() => import("./src/components/SignIn/SignIn"));
const SignUp = React.lazy(() => import("./src/components/SignUp/SignUp"));
const UpdateProfile = React.lazy(() =>
  import("./src/components/UpdateProfile/UpdateProfile")
);

const routes = [
  { path: "/community", exact: true, name: "Community", component: Community },
  { path: "/event", exact: true, name: "Event", component: Event },
  { path: "/mycircle", exact: true, name: "My Circle", component: MyCircle },
  {
    path: "/newevent",
    exact: true,
    name: "Create an event!",
    component: NewEvent,
  },
  { path: "/profile", exact: true, name: "Profile", component: Profile },
  { path: "/room", exact: true, name: "Room", component: Room },
  { path: "/signin", exact: true, name: "Sign In", component: SignIn },
  { path: "/signup", exact: true, name: "Sign Up", component: SignUp },
  {
    path: "/updateprofile/:id",
    exact: true,
    name: "Update Profile",
    component: UpdateProfile,
  },
];

export default routes;
