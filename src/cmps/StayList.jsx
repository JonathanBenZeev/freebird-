
import { StayPreview } from './StayPreview'

export const StayList = ({ stays }) => {

  return (
    <section className='stay-list'>
      {stays.map((stay) => (
        <StayPreview stay={stay} key={stay._id} />
      ))}
    </section>
  )
}
