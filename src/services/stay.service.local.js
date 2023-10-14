import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
  addStayMsg,
}
// debug trick
window.bs = stayService

async function query(filterBy = { txt: '', price: 0 }) {
  var stays = await storageService.query(STORAGE_KEY)
  console.log('stays', stays)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    stays = stays.filter(
      (stay) =>
        regex.test(stay.title) || regex.test(stay.description)
    )
  }
  if (filterBy.price) {
    stays = stays.filter(
      (stay) => stay.price <= filterBy.price
    )
  }
  return stays
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
  var savedStay
  if (stay._id) {
    savedStay = await storageService.put(STORAGE_KEY, stay)
  } else {
    // Later, owner is set by the backend
    stay.owner = userService.getLoggedinUser()
    savedStay = await storageService.post(STORAGE_KEY, stay)
  }
  return savedStay
}

async function addStayMsg(stayId, txt) {
  // Later, this is all done by the backend
  const stay = await getById(stayId)
  if (!stay.msgs) stay.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  stay.msgs.push(msg)
  await storageService.put(STORAGE_KEY, stay)

  return msg
}

function getEmptyStay() {
  return {
    title: 'Stay-' + (Date.now() % 1000),
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
