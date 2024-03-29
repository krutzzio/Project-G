import { useState } from "react"
import ColumnContainer from "./ColumnContainer"
import Modal from "../../Modal/Modal"
import { useProjects } from "../../../hooks/useProjects"

export default function ProjectsBoard() {

    const [createProject, setCreateProject] = useState<boolean>(false)

    const { projects, addProject, deleteProject } = useProjects()

    return (
        <main className="p-8">
            <h1 className="text-4xl font-light mb-4">Projects</h1>
            <div className="h-full grid grid-cols-5">
                {
                    createProject &&
                    <Modal type={"project"} addProject={addProject} closeModal={() => setCreateProject(false)} />
                }
                <div className="w-full flex flex-col gap-4 col-span-3">
                    {
                        projects?.map(project => <ColumnContainer key={project.id} project={project} deleteProject={deleteProject} />)
                    }
                    <button onClick={() => setCreateProject(true)}>Add Project</button>
                </div>
            </div>
        </main>
    )
}
