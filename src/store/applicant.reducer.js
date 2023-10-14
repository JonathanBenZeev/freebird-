export const SET_APPLICANTS = 'SET_APPLICANTS'
export const REMOVE_APPLICANT = 'REMOVE_APPLICANT'
export const ADD_APPLICANT = 'ADD_APPLICANT'
export const UPDATE_APPLICANT = 'UPDATE_APPLICANT'
export const UNDO_REMOVE_APPLICANT = 'UNDO_REMOVE_APPLICANT'


const initialState = {
    applicants: [],
    lastRemovedApplicant: null
}

export function applicantReducer(state = initialState, action) {
    var newState = state
    var applicants
    switch (action.type) {
        case SET_APPLICANTS:
            newState = { ...state, applicants: action.applicants }
            break
        // case REMOVE_APPLICANT:
        //     const lastRemovedApplicant = state.applicants.find(applicant => applicant._id === action.applicantId)
        //     applicants = state.applicants.filter(applicant => applicant._id !== action.applicantId)
        //     newState = { ...state, applicants, lastRemovedApplicant }
        //     break
        case ADD_APPLICANT:
            newState = { ...state, applicants: [...state.applicants, action.applicant] }
            break
        case UPDATE_APPLICANT:
            applicants = state.applicants.map(applicant => (applicant._id === action.applicant._id) ? action.applicant : applicant)
            newState = { ...state, applicants }
            break
        case UNDO_REMOVE_APPLICANT:
            if (state.lastRemovedApplicant) {
                newState = { ...state, applicants: [...state.applicants, state.lastRemovedApplicant], lastRemovedApplicant: null }
            }
            break
        default:
    }
    return newState
}
