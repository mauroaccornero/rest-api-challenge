import Button from "../../Button/Button";
import Message from "../../Message/Message";
import Modal from "../../Modal/Modal";
import {memo} from "react";

export declare interface IDeleteModalProps {
    processStatus: null | "error" | "success" | "confirm" | "processing"
    deleteItem: () => void
    abortDelete: () => void
}

const DeleteModal = memo(({processStatus, deleteItem, abortDelete}: IDeleteModalProps) => {
    return (<Modal>
        {processStatus === "confirm" && (<div><div>Are you sure?</div> <Button testId="delete-button" label={"Yes, delete item"} handleClick={deleteItem} /> <Button label={"No"} handleClick={abortDelete} /></div>)}
        {processStatus === "error" && (<Message type={"error"} message={"Some error occurred"} />)}
        {processStatus === "processing" && (<Message type={"info"} message={"Processing the request, please wait..."} />)}
        {processStatus === "success" && (<Message type={"success"} message={"Deletion complete"} />)}
    </Modal>)
})

DeleteModal.displayName = "DeleteModal"

export default DeleteModal