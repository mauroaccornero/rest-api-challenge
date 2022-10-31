import React from "react";

import "./card.css"

declare interface ICardProps {
    children: React.ReactNode
}
const Card = ({children}: ICardProps) => {
    return (<section className={"card"}>{children}</section>)
}

export default Card