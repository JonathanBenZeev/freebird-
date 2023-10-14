import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'applicant'

export const applicantService = {
  query,
  getById,
  save,
  remove,
  getEmptyApplicant,
  addApplicantMsg,
}
// debug trick
window.bs = applicantService

async function query(filterBy = { txt: '', price: 0 }) {
  var applicants = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    applicants = applicants.filter(
      (applicant) =>
        regex.test(applicant.title) || regex.test(applicant.description)
    )
  }
  if (filterBy.price) {
    applicants = applicants.filter(
      (applicant) => applicant.price <= filterBy.price
    )
  }
  return applicants
}

function getById(applicantId) {
  return storageService.get(STORAGE_KEY, applicantId)
}

async function remove(applicantId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, applicantId)
}

async function save(applicant) {
  var savedApplicant
  if (applicant._id) {
    savedApplicant = await storageService.put(STORAGE_KEY, applicant)
  } else {
    // Later, owner is set by the backend
    applicant.owner = userService.getLoggedinUser()
    savedApplicant = await storageService.post(STORAGE_KEY, applicant)
  }
  return savedApplicant
}

async function addApplicantMsg(applicantId, txt) {
  // Later, this is all done by the backend
  const applicant = await getById(applicantId)
  if (!applicant.msgs) applicant.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  applicant.msgs.push(msg)
  await storageService.put(STORAGE_KEY, applicant)

  return msg
}

function getEmptyApplicant() {
  return {
    title: 'Applicant-' + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

// TEST DATA
// storageService
//   .post(STORAGE_KEY, {
//     title: 'Sublet in Tel-Aviv',
//     description: "Sublet in Tel-Aviv for one month",
//     maxGuests: 3,
//     animalFriendly: true,
//     rent: {
//       price: 6000,
//       currency: 'ILS',
//       bill: 500,
//     },
//     covers: [],
//     byUserIds: ['21292'],
//     ownerName: 'David',
//     room: 2,
//     porch: 1,
//     location: {
//       country: 'Israel',
//       city: 'Tel-Aviv',
//       street: 'Pinkas',
//       number: '16',
//     },
//     questions: [
//       {
//         id: '3123dfs',
//         wish: 'How many will you be?',
//         default: true,
//         answers: [
//           {
//             id: '312d44ff3dfs',
//             answer: 1,
//             priority: 1,
//           },
//           {
//             id: '312d423423ff3dfs',
//             answer: 2,
//             priority: 2,
//           },
//           {
//             id: '312d453ff3dfs',
//             answer: 3,
//             priority: 3,
//           },
//           {
//             id: '312d466ff3dfs',
//             answer: 4,
//             priority: 4,
//           },
//         ],
//       },
//       {
//         id: '3123dfsca',
//         wish: 'Where do you work from?',
//         default: false,
//         answers: [
//           {
//             id: '312d443ff3dfs324',
//             answer: 'Home',
//             priority: 1,
//           },
//           {
//             id: 'dsf312d423423ff3dfs',
//             answer: 'Office',
//             priority: 2,
//           },
//         ],
//       },
//     ],
//     applicants: [
//       {
//         id: 'sdlgjfsfgd43dl432',
//         lead: {
//           fName: 'tal',
//           lName: 'Wolfson',
//           img_url:
//             'https://res.cloudinary.com/dmldeettg/image/upload/v1653127589/samples/people/smiling-man.jpg',
//         },
//         email: 'hfdfsfdh@gmail.com',
//         number: '0546311933',
//         facebookUrl: 'https://www.facebook.com/tal.benzeev',
//         stayId: '212yiy2323',
//         questions: [
//           {
//             id: '3123dfs',
//             answers: [
//               {
//                 id: '312d44ff3dfs',
//               },
//               {
//                 id: '312d423423ff3dfs',
//               },
//             ],
//           },
//           {
//             id: '3123dfsca',
//             answers: [
//               {
//                 id: '312d443ff3dfs324',
//               },
//             ],
//           },
//         ],
//         grade: 82,
//       },
//       {
//         email: 'sdf@gmail.com',
//         facebookUrl: 'http://www.facebook.com/ki',
//         lead: {
//           fName: 'yonatan',
//           lName: 'Wolfson',
//           img_url:
//             'https://res.cloudinary.com/dmldeettg/image/upload/v1697302095/profile_phgx3i.png',
//         },
//         grade: 88,
//         number: '0506311111',
//         questions: [],
//         stayId: '212yiy2',
//         id: '6a820f16-b745-48e4-a046-37d2632c0aef',
//       },
//       {
//         lead: {
//           fName: 'yonatan',
//           lName: 'Wolfson',
//           img_url:
//             'https://res.cloudinary.com/dmldeettg/image/upload/v1697302095/profile_phgx3i.png',
//         },
//         email: 'sdf@gmail.com',
//         facebookUrl: 'http://www.facebook.com/ki',
//         grade: 88,
//         number: '0506311111',
//         questions: [],
//         stayId: '212yiy2',
//         id: 'c210662a-3c2b-4c89-874f-733930b3d73c',
//       },
//       {
//         email: 'sdf@gmail.com',
//         facebookUrl: 'http://www.facebook.com/ki',
//         grade: 88,
//         lead: {
//           fName: 'yonatan',
//           lName: 'Wolfson',
//           img_url:
//             'https://res.cloudinary.com/dmldeettg/image/upload/v1697302095/profile_phgx3i.png',
//         },
//         number: '0506311111',
//         questions: [],
//         stayId: '212yiy2',
//         id: '35cdcf52-b840-4b59-8144-33d1d91393da',
//       },
//       {
//         lead: {
//           fName: 'yonatan',
//           lName: 'Wolfson',
//           img_url:
//             'https://res.cloudinary.com/dmldeettg/image/upload/v1697302095/profile_phgx3i.png',
//         },
//         email: 'sdf@gmail.com',
//         facebookUrl: 'http://www.facebook.com/ki',
//         grade: 88,
//         number: '0506311111',
//         questions: [],
//         stayId: '212yiy2',
//         id: 'df7720e2-b784-46f6-9b4c-8ee4f1879e6b',
//       },
//       {
//         lead: {
//           fName: 'yonatan',
//           lName: 'Wolfson',
//           img_url:
//             'https://res.cloudinary.com/dmldeettg/image/upload/v1697302095/profile_phgx3i.png',
//         },
//         email: 'sdf@gmail.com',
//         facebookUrl: 'http://www.facebook.com/ki',
//         grade: 88,
//         number: '0506311111',
//         questions: [],
//         stayId: '212yiy2',
//         id: 'b847a395-1c22-4251-b143-87bf4624f2ca',
//       },
//     ],
//   })
//   .then((x) => console.log(x))

// const stay = {

// }
