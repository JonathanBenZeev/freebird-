import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { MdCheckBox } from 'react-icons/md'
export const ApplicantHeader = ({ onSelectAll, selectedAll }) => {
  return (
    <section className='applicant-header'>
      <div className='select' onClick={onSelectAll}>
        {selectedAll ? (
          <MdCheckBox className='fill' />
        ) : (
          <MdCheckBoxOutlineBlank />
        )}
      </div>
      <div className='lead'>
        <span>LEAD NAME</span>
      </div>
    </section>
  )
}
