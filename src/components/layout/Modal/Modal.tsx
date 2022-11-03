import React from "react";

import "./modal.css"

interface IModalProps {
    children: React.ReactNode
}

const Modal = ({children}: IModalProps) => {
    return (<div id={"modal-overlay"}>
        <div id="modal">{children}</div>
    </div>)
}

export default Modal