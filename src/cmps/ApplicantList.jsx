import { useState } from 'react'
import { ApplicantHeader } from './ApplicantHeader'
import { ApplicantPreview } from './ApplicantPreview'

export const ApplicantList = ({ stay }) => {
  // const {applicants}=stay
  const [selectedApplicants, setSelectedApplicants] = useState([])
  const [isMainCheckbox, setIsMainCheckbox] = useState({ isActive: false })

  async function handleCheckboxChange(...applicant) {
    try {
      if (selectedApplicants.includes(...applicant)) {
        selectedApplicants.splice(selectedApplicants.indexOf(applicant), 1)
        console.log(selectedApplicants)
        setSelectedApplicants((selectedApplicants) => [...selectedApplicants])
      } else {
        setSelectedApplicants((prevApplicant) => [
          ...prevApplicant,
          applicant[0],
        ])
      }
    } catch (err) {
      console.log('err:', err)
    }
  }

  function onClickMainCheckbox() {
    if (isMainCheckbox.isActive) setSelectedApplicants([])
    else setSelectedApplicants(stay.applicants)
    setIsMainCheckbox({ isActive: !isMainCheckbox.isActive })
  }

  return (
    <section className='applicant-list'>
      <ApplicantHeader
        isMainCheckbox={isMainCheckbox.isActive}
        onClickMainCheckbox={onClickMainCheckbox}
        cmpsOrder={stay.cmpsOrder}
      />
      {stay.applicants.map((applicant) => (
        <ApplicantPreview
          applicant={applicant}
          key={applicant.id}
          handleCheckboxChange={handleCheckboxChange}
          isMainCheckbox={isMainCheckbox}
        />
      ))}
    </section>
  )
}
