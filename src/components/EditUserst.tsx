import { useCurrentUsers } from '../hooks/useCurrentUsers'
import EditUsersList from './EditUsersList'

const EditUsers = () => {
  const { user } = useCurrentUsers()
  return (
    <>
      {user?.map((e) => {
        return <EditUsersList key={e.id} {...e} />
      })}
    </>
  )
}

export default EditUsers
