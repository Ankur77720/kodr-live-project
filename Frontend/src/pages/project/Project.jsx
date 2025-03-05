import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { io } from "socket.io-client"
import './Project.css'
import CodeEditor from '../../components/CodeEditor'


const Project = () => {

    const params = useParams()

    console.log(params)

    const [ socket, setSocket ] = useState(null)

    const [ messages, setMessages ] = useState([])
    const [ currentMessage, setCurrentMessage ] = useState("")

    const [ code, setCode ] = useState(`const greet = () => {
        console.log("Hello, World!");
      };`)


    const appendMessage = (msg) => {
        const temp = messages
        temp.push(msg)
        setMessages([ ...temp ])
    }

    useEffect(() => {
        const tempSocket = io('https://4bmp65kq-3000.inc1.devtunnels.ms', {
            query: {
                projectId: params.projectId
            }
        })

        tempSocket.on('chacha', msg => {
            console.log(msg)
            appendMessage(msg)
        })

        setSocket(tempSocket)
    }, [])




    return (
        <main>
            <section className="project-view">
                <div className="conversation">
                    <div className="messages">

                        {messages.map((message, index) => {
                            return (
                                <div className="message">
                                    <p>{message}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="input-group">
                        <input
                            value={currentMessage}
                            onChange={(e) => { setCurrentMessage(e.target.value) }}
                            type="text" placeholder='Enter message' />
                        <button
                            onClick={() => {
                                socket.emit('chacha', currentMessage)
                                appendMessage(currentMessage)
                                setCurrentMessage("")
                            }}
                        ><i className="ri-end-plane-fill"></i></button>
                    </div>
                </div>
                <div className="code" style={{ color: "white" }}>
                    <CodeEditor setCode={setCode} code={code} language="javascript" />
                </div>
                <div className="review"></div>

            </section>
        </main>

    )
}

export default Project