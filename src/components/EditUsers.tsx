import { Box, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserCurrent } from "./../hooks/useUserCurrent";
import EditUsers2 from "./EditUsers2";
export const EditUsersSchema = z.object({
  userName: z.string().min(5, { message: "hasło jest zbyt którkie" }).trim(),
});

type EditUsersSchemaType = z.infer<typeof EditUsersSchema>;

const EditUsers = () => {
  const [editName, SetEditname] = useState<boolean>(false);
  const name = "artur";
  const { cuser } = useUserCurrent();
  const [newNam, setNreName] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<EditUsersSchemaType>();
  const submit = ({ userName }: EditUsersSchemaType) => {
    // console.log(userName);
    setNreName(userName);
  };
  console.log(cuser);

  return (
    <>
      {cuser?.map((e) => {
        return (
          <EditUsers2
            key={e.id}
            id={e.id}
            uid={e.uid}
            name={e.name}
            email={e.email}
            password={e.password}
            photoNumber={e.photoNumber}
          />
        );
      })}
      {/* <Container maxWidth="sm" sx={{ marginTop: 3 }}>
        {cuser?.map((e) => {
          return (
            <Paper elevation={4}>
              <Box
                sx={{ display: "flex", alignItems: "center" }}
                marginLeft={2}
                paddingTop={2}
                marginBottom={2}
                marginTop={2}
              ></Box>

              <Box
                marginLeft={5}
                marginBottom={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography variant="h6" component="h3">
                  Name:
                </Typography>
                {editName ? (
                  <TextField type="text" value={"Artur"} />
                ) : (
                  <TextField/>
                )}
                <button onChange={() => SetEditname(true)}>Edit</button>
              </Box>
              <Box marginLeft={5} marginBottom={3}>
                <Typography variant="h6" component="h3">
              Name: Artur
            </Typography>
                <Typography variant="subtitle1" component="h2">
                  {props?.userName?.toUpperCase() || props?.author[0].email}
                  E-mail: {e.email}
                </Typography>
                <Typography variant="subtitle1" component="h2">
                  new post
                  Password: {e.password}
                </Typography>
                <Typography variant="subtitle1" component="h2">
                  new post
                  Photo number : {e.photoNumber}
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </Container> */}
    </>
  );
};

export default EditUsers;
