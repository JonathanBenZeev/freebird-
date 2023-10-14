import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {getStay} from '../store/stay.actions.js'
import { ApplicantList } from '../cmps/ApplicantList'
import { useParams } from 'react-router-dom';
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { userService } from '../services/user.service.js'
// import { applicantService } from '../services/applicant.service.local.js'

export function ApplicantIndex() {
    const params = useParams()
    const stay = useSelector(storeState => storeState.stayModule.stay)

    useEffect(() => {
        getStay(params.stayId)
    }, [params.stayId])

    // async function onRemoveApplicant(applicantId) {
    //     try {
    //         await removeApplicant(applicantId)
    //         showSuccessMsg('Applicant removed')            
    //     } catch (err) {
    //         showErrorMsg('Cannot remove applicant')
    //     }
    // }

    // async function onAddApplicant() {
    //     const applicant = applicantService.getEmptyApplicant()
    //     applicant.title = prompt('Title?')
    //     try {
    //         const savedApplicant = await addApplicant(applicant)
    //         showSuccessMsg(`Applicant added (id: ${savedApplicant._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add applicant')
    //     }        
    // }

    // async function onUpdateApplicant(applicant) {
    //     const price = +prompt('New price?')
    //     const applicantToSave = { ...applicant, price }
    //     try {
    //         const savedApplicant = await updateApplicant(applicantToSave)
    //         showSuccessMsg(`Applicant updated, new price: ${savedApplicant.price}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update applicant')
    //     }        
    // }

    // function onAddApplicantMsg(applicant) {
    //     console.log(`TODO Adding msg to applicant`)
    // }
    // function shouldShowActionBtns(applicant) {
    //     const user = userService.getLoggedinUser()
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return applicant.owner?._id === user._id
    // }
    //   console.log(stay?.applicants);
      if(!stay?.applicants.length) return <h1>loading..</h1>
    return (
        <div className='applicant-index'>
            <h3>Applicant App</h3>
            <div>filter header</div>
            <main>
                {/* <button onClick={onAddApplicant}>Add Applicant ⛐</button> */}
                <ApplicantList stay={stay}/>
                {/* <ul className="applicant-list">
                    {applicants.map(applicant =>
                        <li className="applicant-preview" key={applicant._id}>
                            <h4>{applicant.title}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${applicant.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{applicant.owner && applicant.owner.fullname}</span></p>
                            {shouldShowActionBtns(applicant) && <div>
                                <button onClick={() => { onRemoveApplicant(applicant._id) }}>x</button>
                                <button onClick={() => { onUpdateApplicant(applicant) }}>Edit</button>
                            </div>}

                            <button onClick={() => { onAddApplicantMsg(applicant) }}>Add applicant msg</button>
                        </li>)
                    }
                </ul> */}
            </main>
        </div>
    )
}