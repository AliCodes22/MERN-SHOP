import { Alert } from "react-bootstrap";
const Message = ({ variant, chiilden }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
