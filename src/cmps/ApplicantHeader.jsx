import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { MdCheckBox } from 'react-icons/md'
export const ApplicantHeader = ({ onSelectAll, selectedAll ,isMainCheckbox,onClickMainCheckbox}) => {
  return (
    <section className='applicant-header'>
      {/* <div className='check-box'>
        <input
          type='checkbox'
          checked={true}
          // onChange={onClickMainCheckbox}
        />
      </div> */}
      <div className='select' onClick={onClickMainCheckbox}>
        {isMainCheckbox ? (
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
