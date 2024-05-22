import * as React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CommentCard = ({ comment }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body1" component="p">
          {comment.text}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {comment.username} - {new Date(comment.createdAt).toLocaleDateString("tr-TR")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
