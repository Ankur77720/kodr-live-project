import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import './Home.css'

const Home = () => {

    const [ projects, setProjects ] = useState([])
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ projectName, setProjectName ] = useState('')

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        setIsModalOpen(false)

        axios.post('https://4bmp65kq-3000.inc1.devtunnels.ms/v1/api/projects/create', {
            name: projectName
        })
            .then(response => {
                console.log(response.data)
                getProjects()
            })

    }

    function getProjects() {
        axios.get('https://4bmp65kq-3000.inc1.devtunnels.ms/v1/api/projects/list')
            .then((response) => {
                setProjects(response.data.projects)
            })
    }

    useEffect(() => {
        getProjects()
    }, [])


    return (

        <main>
            <section className="home-view">
                <div className="projects">
                    {
                        projects.map((project, index) => {
                            return (
                                <div
                                    onClick={() => { navigate(`/project/${project._id}`) }}
                                    className="project">
                                    <h1>{project.name}</h1>
                                </div>
                            )
                        })
                    }

                    <button
                        onClick={() => {
                            setIsModalOpen(true)
                        }}
                        className="new-project">
                        new project
                    </button>

                </div>

                {isModalOpen && <div className="modal">

                    <form
                        onSubmit={handleSubmit}
                    >
                        <input value={projectName} onChange={(e) => { setProjectName(e.target.value) }} type="text" name='name' placeholder='Enter project name' />
                        <input type="submit" value={"create project"} />
                    </form>

                </div>}

            </section>
        </main>

    )
}

export default Home