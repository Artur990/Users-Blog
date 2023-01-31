import React from "react";
import { Avatar, Button, IconButton, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import moment from "moment";

import { PostType } from "../../types/postType";

const Message = (props: PostType) => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 3 }}>
      <Paper elevation={4}>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          marginLeft={2}
          paddingTop={2}
          marginBottom={2}
          marginTop={2}
        >
          <IconButton size="small" sx={{ ml: 2 }}>
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={props?.author[0]?.avatar ? props.author[0].avatar : ""}
            >
              {props?.userName?.charAt(0)?.toUpperCase() ||
                props?.author[0].email?.charAt(0)?.toUpperCase()}
            </Avatar>
          </IconButton>
          <Typography variant="h6" component="h3">
            {props?.userName || props?.author[0].email}
          </Typography>
        </Box>
        <Box marginLeft={5} marginBottom={3}>
          <Typography variant="subtitle1" component="h2">
            {props.postText}
          </Typography>
        </Box>
        <Box
          marginLeft={5}
          marginBottom={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="subtitle1"
              component="h1"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {!props?.comments?.length ? 0 : props?.comments?.length} Comments
            </Typography>

            <Button
              href={`post/${props.id}`}
              component="a"
              sx={{ margin: 1, textDecoration: "none" }}
            >
              Add
            </Button>
          </Box>
          <Typography variant="subtitle1" component="a" marginRight={2}>
            {moment(props?.createdAT).fromNow()}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Message;
