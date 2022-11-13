import React from "react";
import { Container } from "@mui/system";

import { useBlog } from "../../hooks/useBlog";
import { useUserCurrent } from "../../hooks/useUserCurrent";
import Message from "./Message";

const Blogs = () => {
  const { blog } = useBlog();
  const { cuser } = useUserCurrent();
  console.log();
  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      <div>
        {blog?.map((e, d) => {
          return (
            <Message
              key={e.id}
              postText={e.postText}
              userName={e.userName}
              comments={e.comments}
              author={e.author}
              id={e.id}
              createdAT={e.createdAT}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Blogs;
