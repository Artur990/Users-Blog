import { Password } from "@mui/icons-material";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { doc, updateDoc } from "firebase/firestore";
import * as React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { date, z } from "zod";
import { db } from "../firebase/config";
import { useUserCurrent } from "./../hooks/useUserCurrent";
type FormValues = {
  name: string;
  email: string;
  password: string;
  photoNumber: string;
};
export const EditUsersSchema = z.object({
  name: z.string().min(3, "Imię musi wymagać conajmiej 4 znaki"),
  email: z.string().email("wpisz poprawny adres").min(5).max(15),
  password: z.string().min(5, { message: "hasło jest zbyt którkie" }).trim(),
  photoNumber: z.string(),
});

type EditUsersSchemaType = z.infer<typeof EditUsersSchema>;

const EditUsers2 = (props: any) => {
  const postCollectionRef = doc(db, "Users", props.id);
  const { watch, register, handleSubmit, setValue, formState } =
    useForm<EditUsersSchemaType>({
      defaultValues: {
        name: props.name,
        email: props.email,
        password: props.password,
        photoNumber: props.photoNumber,
      },
    });
  console.log(props.id);
  const onSubmit = async (data: EditUsersSchemaType) => {
    console.log(data);
    try {
      await updateDoc(postCollectionRef, {
        name: data.name,
        email: data.email,
        password: data.password,
        photoNumber: data.photoNumber,
      });
      toast.success("Twój post został dodany");
    } catch (error) {
      toast.error("Coś poszło nie tak");
    }
  };
  const { cuser } = useUserCurrent();
  console.log(cuser);
  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={4}>
          <Box marginLeft={5} marginBottom={3}>
            <Typography variant="subtitle1" component="h2">
              Name
            </Typography>
            <TextField {...register("name")} placeholder={props.name} />
            <Typography variant="subtitle1" component="h2">
              E-mail:
            </Typography>
            <TextField {...register("email")} placeholder={props.email} />
            <Typography variant="subtitle1" component="h2">
              Password:
            </Typography>
            <TextField {...register("password")} placeholder={props.password} />
            <Typography variant="subtitle1" component="h2">
              Photo number :
            </Typography>
            <TextField
              {...register("photoNumber")}
              placeholder={props.photoNumber}
            />
          </Box>
          <input type="submit" />
          <Button
            type="button"
            onClick={() => {
              setValue("name", props.name, { shouldTouch: true });
              setValue("email", props.email, { shouldTouch: true });
              setValue("password", props.password, { shouldTouch: true });
              setValue("photoNumber", props.photoNumber, {
                shouldTouch: true,
              });
            }}
          >
            trigger value
          </Button>
        </Paper>
      </form>
    </Container>
  );
};
export default EditUsers2;
