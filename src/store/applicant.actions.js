import { applicantService } from "../services/applicant.service.local.js";
import { store } from '../store/store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_APPLICANT, REMOVE_APPLICANT, SET_APPLICANTS, UNDO_REMOVE_APPLICANT, UPDATE_APPLICANT } from "./applicant.reducer.js";

// Action Creators:
export function getActionRemoveApplicant(applicantId) {
    return {
        type: REMOVE_APPLICANT,
        applicantId
    }
}
export function getActionAddApplicant(applicant) {
    return {
        type: ADD_APPLICANT,
        applicant
    }
}
export function getActionUpdateApplicant(applicant) {
    return {
        type: UPDATE_APPLICANT,
        applicant
    }
}

export async function loadApplicants() {
    try {
        const applicants = await applicantService.query()
        console.log('Applicants from DB:', applicants)
        store.dispatch({
            type: SET_APPLICANTS,
            applicants
        })

    } catch (err) {
        console.log('Cannot load applicants', err)
        throw err
    }

}

export async function removeApplicant(applicantId) {
    try {
        await applicantService.remove(applicantId)
        store.dispatch(getActionRemoveApplicant(applicantId))
    } catch (err) {
        console.log('Cannot remove applicant', err)
        throw err
    }
}

export async function addApplicant(applicant) {
    try {
        const savedApplicant = await applicantService.save(applicant)
        console.log('Added applicant', savedApplicant)
        store.dispatch(getActionAddApplicant(savedApplicant))
        return savedApplicant
    } catch (err) {
        console.log('Cannot add applicant', err)
        throw err
    }
}

export function updateApplicant(applicant) {
    return applicantService.save(applicant)
        .then(savedApplicant => {
            console.log('Updated applicant:', savedApplicant)
            store.dispatch(getActionUpdateApplicant(savedApplicant))
            return savedApplicant
        })
        .catch(err => {
            console.log('Cannot save applicant', err)
            throw err
        })
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveApplicantOptimistic(applicantId) {
    store.dispatch({
        type: REMOVE_APPLICANT,
        applicantId
    })
    showSuccessMsg('applicant removed')

    applicantService.remove(applicantId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove applicant')
            console.log('Cannot load applicants', err)
            store.dispatch({
                type: UNDO_REMOVE_APPLICANT
            })
        })
}
