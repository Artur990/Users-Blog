import { Send } from "@mui/icons-material";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { deleteUser } from "firebase/auth";
import { EditUserType } from "../types/editUsersType";

export const EditUsersSchema = z.object({
  name: z.string().min(3, "Imię musi wymagać conajmiej 4 znaki"),
  email: z.string().email("wpisz poprawny adres").min(5).max(15),
  password: z.string().min(5, { message: "hasło jest zbyt którkie" }).trim(),
  phoneNumber: z.string(),
});

type EditUsersSchemaType = z.infer<typeof EditUsersSchema>;

const EditUsersLisy = (props: EditUserType) => {
  const postCollectionRef = doc(db, "Users", props.id);
  const { register, handleSubmit, setValue } = useForm<EditUsersSchemaType>({
    defaultValues: {
      name: props.name,
      email: props.email,
      password: props.password,
      phoneNumber: props.phoneNumber,
    },
  });

  const onSubmit = async (data: EditUsersSchemaType) => {
    console.log(data);
    try {
      await updateDoc(postCollectionRef, {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      });
      toast.success("Twój post został dodany");
    } catch (error) {
      toast.error("Coś poszło nie tak");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={4}>
          <Box marginLeft={5} marginBottom={3}>
            <Typography variant="subtitle1" component="h2">
              Imie:
            </Typography>
            <TextField {...register("name")} placeholder={props.name} />
            <Typography variant="subtitle1" component="h2">
              E-mail:
            </Typography>
            <TextField {...register("email")} placeholder={props.email} />
            <Typography variant="subtitle1" component="h2">
              Hasło:
            </Typography>
            <TextField {...register("password")} placeholder={props.password} />
            <Typography variant="subtitle1" component="h2">
              Nmer Telefonu :
            </Typography>
            <TextField
              {...register("phoneNumber")}
              placeholder={props.phoneNumber}
            />
          </Box>
          <Box
            marginLeft={4}
            marginBottom={2}
            marginTop={2}
            sx={{ padding: 1 }}
          >
            <Button
              sx={{ marginRight: 2 }}
              type="submit"
              variant="contained"
              endIcon={<Send />}
            >
              Aktualizuj dane
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                setValue("name", props.name, { shouldTouch: true });
                setValue("email", props.email, { shouldTouch: true });
                setValue("password", props.password, { shouldTouch: true });
                setValue("phoneNumber", props.phoneNumber, {
                  shouldTouch: true,
                });
              }}
            >
              Obecne dane
            </Button>
          </Box>
        </Paper>
      </form>
    </Container>
  );
};
export default EditUsersLisy;
