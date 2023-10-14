import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { MdCheckBox } from 'react-icons/md'
export const ApplicantHeader = ({
  cmpsOrder,
  isMainCheckbox,
  onClickMainCheckbox,
}) => {
  console.log(cmpsOrder)
  function getTitleName(cmpOrder) {
    switch (cmpOrder) {
        case 'StatusPicker':
            return 'Status'
        case 'DatePicker':
            return 'Date'
        case 'GradePicker':
            return 'MATCH'
        default: return ''
    }
}

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
        <span>Lead name</span>
      </div>
      {cmpsOrder.map((title, idx) => {
        return (
          <div className='lead' key={idx}>
            <span>{getTitleName(title)}</span>
          </div>
        )
      })}
    </section>
  )
}
