import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { MdCheckBox } from 'react-icons/md'
import { BiTimeFive } from 'react-icons/bi'
import { useEffect, useState } from 'react'

export const ApplicantPreview = ({
  applicant,
  isMainCheckbox,
  handleCheckboxChange,
}) => {
  const [isClick, setIsClick] = useState(false)

  useEffect(() => {
    setIsClick(isMainCheckbox.isActive)
  }, [isMainCheckbox])

  function onCheckBoxChange() {
    handleCheckboxChange(applicant)
    setIsClick(!isClick)
  }

  const { lead } = applicant
  return (
    <li className='applicant-preview'>
      <section className='applicant-preview-container'>
        <div className='select-item' onClick={onCheckBoxChange}>
          {isClick ? (
            <MdCheckBox className='fill' />
          ) : (
            <MdCheckBoxOutlineBlank />
          )}
          {/* <MdCheckBox className='fill'/> */}
        </div>
        <div className='lead-container'>
          <img src={lead.img_url} alt='' />
          <div className='lead-info'>
            <h5>
              <span>{lead.fName}</span> <span>{lead.lName}</span>
            </h5>
            <div className='time-left'>
              <span>
                <BiTimeFive />
              </span>
              <p> yesterday</p>
            </div>
          </div>
        </div>
      </section>
    </li>
  )
}
