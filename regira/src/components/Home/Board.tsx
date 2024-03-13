import { /*useContext,*/ useEffect, useMemo, useRef, useState } from "react"
import { Project } from "../../types"
import ColumnContainer from "./ColumnContainer"
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
//import Context from "../../Context"
import Modal from "../Modal/Modal"

export default function Board() {

    const [columns, setColumns] = useState<Project[]>([])
    const [newProject, setNewProject] = useState<boolean>(false)
    const modalRef = useRef(null)
    // const { loggedInfo } = useContext(Context)

    useEffect(() => {
        const API_PROJECTES_URL = "http://localhost:3000/api/projects"
        fetch(API_PROJECTES_URL, { credentials: 'include' })
            .then(resp => resp.json())
            .then(data => setColumns(data))
            .catch(err => console.log(err))
    }, [])

    const columnsId = useMemo(() => columns.map(col => col.id), [columns])

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    }))

    const addColumn = (newProject: Project) => {
        setColumns([...columns, newProject]);
    }

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return
        const activeColId = active.id
        const overColId = over.id
        if (activeColId === overColId) return

        setColumns((columns) => {
            const activeColInd = columns.findIndex(col => col.id === activeColId)
            const overColInd = columns.findIndex(col => col.id === overColId)
            return arrayMove(columns, activeColInd, overColInd)
        })
    }

    return (
        <div className="h-full p-8" ref={modalRef}>
            <article className="m-8">
                {
                    newProject
                        ? <Modal type={"project"} addProject={addColumn} closeModal={() => setNewProject(false)} />
                        : <></>
                }
            </article>


            <DndContext sensors={sensors} onDragEnd={onDragEnd}>
                <div className="w-full grid grid-cols-4 gap-4">
                    <SortableContext items={columnsId}>
                        {
                            columns?.map(col => <ColumnContainer key={col.id} column={col} />)
                        }
                    </SortableContext>
                </div>
            </DndContext>
            <button onClick={() => setNewProject(true)}>Add Project</button>

        </div>
    )
}
