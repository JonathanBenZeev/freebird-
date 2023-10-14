import { useState } from 'react'
import { ApplicantHeader } from './ApplicantHeader'
import { ApplicantPreview } from './ApplicantPreview'

export const ApplicantList = ({ applicants }) => {
  // const [selectedAll, setSelectedAll] = useState(false)
  const [selectedApplicants, setSelectedApplicants] = useState([])
  const [isMainCheckbox, setIsMainCheckbox] = useState({ isActive: false })
  // const onSelectAll = () => {
  //   setSelectedAll(!selectedAll)
  // }

  async function handleCheckboxChange(...applicant) {
    console.log(applicant);
    try {
      if (selectedApplicants.includes(applicant)) {
        selectedApplicants.splice(selectedApplicants.indexOf(applicant), 1)
        setSelectedApplicants((selectedApplicants) => [...selectedApplicants])
      } else {
        setSelectedApplicants((prevApplicant) => [...prevApplicant, applicant])
      }
    } catch (err) {
      console.log('err:', err)
    }
  }

  function onClickMainCheckbox() {
    if (isMainCheckbox.isActive) setSelectedApplicants([])
    else setSelectedApplicants(applicants)
    setIsMainCheckbox({ isActive: !isMainCheckbox.isActive })
  }
  // console.log(selectedAll)
  return (
    <section className='applicant-list'>
      <ApplicantHeader   isMainCheckbox={ isMainCheckbox.isActive} onClickMainCheckbox={onClickMainCheckbox} />
      {applicants.map((applicant) => (
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
