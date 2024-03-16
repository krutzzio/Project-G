import { useEffect, useState } from 'react'
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import StateContainer from './StateContainer'
import { StateContaierType } from '../../../types'
import { useParams } from 'react-router-dom'

export default function Project() {
  const { id } = useParams()
  const STATES = ["open", "in_progress", "resolved", "closed"]
  const API_ISSUES_URL = `http://localhost:3000/api/issues/project/${id}`


  const [stateColumns, setStateColumns] = useState<StateContaierType[]>([])

  useEffect(() => {
    fetch(API_ISSUES_URL, { credentials: "include" })
      .then(resp => resp.json())
      .then(data => {
        const filteredIssues = STATES.map(state => {
          return {
            title: state,
            issues: data.filter((issue: { state: string }) => issue.state === state)
          }
        })
        setStateColumns(filteredIssues)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(stateColumns) 
  }, [stateColumns])

  const handleDragEnd = (results: DropResult) => {
    const {source, destination, type} = results
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='p-8 grid grid-cols-4 gap-4 h-screen'>
        {
          stateColumns.map(state => <StateContainer key={state.title} title={state.title} issues={state.issues} />)
        }
      </div>
    </DragDropContext>
  )
}
