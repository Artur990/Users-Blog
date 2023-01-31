import { Send } from "@mui/icons-material";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import useEditUsers from "../hooks/useEditUsers";
import { EditUserType } from "../types/editUsersType";

const EditUsersList = (props: EditUserType) => {
  const { handleSubmit, onSubmit, register, setValue } = useEditUsers(props);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={4}>
          <Box marginLeft={5} marginBottom={3}>
            <Typography variant="subtitle1" component="h2">
              Name:
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
              Phone Number:
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
              Current data
            </Button>
          </Box>
        </Paper>
      </form>
    </Container>
  );
};
export default EditUsersList;
