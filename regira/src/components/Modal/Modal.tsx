import { ModalType } from '../../types'
import { AddIssue } from './AddIssue'
import { AddProject } from './AddProject'


export default function Modal(props: ModalType) {

  const { type, addProject, addIssue, closeModal } = props


  return (
    <div className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center'>
      <div onClick={closeModal} className='bg-black transition-colors bg-opacity-40 w-full h-full absolute top-0 left-0'></div>
      <div className='bg-[#E4E2dd] rounded p-8 w-[25rem] min-h-[28rem] z-10 overflow-auto'>
        {
          type === "project"
            ? <AddProject closeModal={closeModal} addProject={addProject} />
            : <AddIssue closeModal={closeModal} issueState={addIssue?.issueState} addIssue={addIssue?.issueFn} />
        }
      </div>
    </div>
  )
}
