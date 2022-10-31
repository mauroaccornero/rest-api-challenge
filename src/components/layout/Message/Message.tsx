import "./message.css"

export declare interface IMessageProps {
  message: string;
  type: "info" | "error" | "warning" | "success";
}

const Message = ({ message, type }: IMessageProps) => {
  return <div className={`message ${type}`}>{message}</div>;
};

export default Message;
