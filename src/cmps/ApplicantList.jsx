import { useState } from 'react'
import { ApplicantHeader } from './ApplicantHeader'
import { ApplicantPreview } from './ApplicantPreview'

export const ApplicantList = ({ applicants }) => {
  const [selectedAll, setSelectedAll] =useState(false)
  const onSelectAll=() => {
       setSelectedAll(!selectedAll)  
  }

  console.log(selectedAll);
  return (
    <section className='applicant-list'>
      <ApplicantHeader onSelectAll={onSelectAll} selectedAll={selectedAll} />
      {applicants.map((applicant) => (
        <ApplicantPreview applicant={applicant} key={applicant.id} onSelectAll={onSelectAll} selectedAll={selectedAll} />
      ))}
    </section>
  )
}
