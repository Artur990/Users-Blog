import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCurrentUsers } from "../hooks/useCurrentUsers";
import EditUsersLisy from "./EditUsersList";
import { EditUserType } from "../types/editUsersType";
export const EditUsersSchema = z.object({
  userName: z.string().min(5, { message: "hasło jest zbyt którkie" }).trim(),
});

const EditUsers = () => {
  const { user } = useCurrentUsers();
  console.log(user);
  return (
    <>
      {user?.map((e) => {
        return (
          <EditUsersLisy
            key={e.id}
            id={e.id}
            uid={e.uid}
            name={e.name}
            email={e.email}
            password={e.password}
            phoneNumber={e.phoneNumber}
            isAdmin={e.isAdmin}
            photoURL={e.photoURL}
          />
        );
      })}
    </>
  );
};

export default EditUsers;
