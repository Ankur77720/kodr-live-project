import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { io } from "socket.io-client"
import './Project.css'


const Project = () => {

    const params = useParams()
    const [ projectId, setProjectId ] = useState(params.projectId)

    const [ socket, setSocket ] = useState(null)

    const [ messages, setMessages ] = useState([])
    const [ currentMessage, setCurrentMessage ] = useState("")

    const appendMessage = (msg) => {
        setMessages([ ...messages, msg ])
    }

    useEffect(() => {
        const tempSocket = io("https://4bmp65kq-3000.inc1.devtunnels.ms", {
            query: {
                projectId
            }
        })

        tempSocket.on('message', msg => {
            appendMessage(msg)
        })

        setSocket(tempSocket)
    }, [])

    return (
        <main>
            <section className="project-view">
                <div className="conversation">
                    {messages.map((message, index) => {
                        return (
                            <div className="message">
                                <p>{message}</p>
                            </div>
                        )
                    })}
                    <div className="input-group">
                        <input
                            value={currentMessage}
                            onChange={(e) => { setCurrentMessage(e.target.value) }}
                            type="text" placeholder='Enter message' />
                        <button
                            onClick={() => {
                                socket.emit('message', currentMessage)
                                appendMessage(currentMessage)
                                setCurrentMessage("")
                            }}
                        ><i className="ri-send-plane-fill"></i></button>
                    </div>
                </div>
                <div className="code"></div>
                <div className="review"></div>

            </section>
        </main>

    )
}

export default Project