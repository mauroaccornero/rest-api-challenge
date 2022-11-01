import {useEffect, useState} from "react";
import axios from "axios";
import Layout from "../../layout/Layout/Layout";
import "./listuser.css"

interface User {
    id: string
}

const ListUser = () => {
    const [data, setData] = useState<User[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | Error>(null)

    useEffect(() => {
        setLoading(true)
        axios(
            {
                method: "get",
                url: process.env.REACT_APP_API_URL + "/users"
            }
        ).then((response) => {
            setData(() => response.data)
        }).catch(e => {
            setError(() => e)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Layout>
        <div>
        {data !== null && (data.map((user) => (<div className={"card-user"} key={user.id}>
            <ul>
                {Object.entries(user).map(([index, item]) => {
                    return (<li key={index}>
                        <strong>{index}:</strong> { typeof item === 'string' ? item : JSON.stringify(item)}
                    </li>)
                })}
            </ul>
        </div>)))}
            {loading && (<div>Loading...</div>)}
            {error !== null && (<div>Some error occurred. {error?.message}</div>)}
    </div>
        </Layout>)
}

export default ListUser