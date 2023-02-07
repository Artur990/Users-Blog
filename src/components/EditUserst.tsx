import { useCurrentUsers } from '../hooks/useCurrentUsers'
import EditUsersList from './EditUsersList'

const EditUsers = () => {
  const { user } = useCurrentUsers()
  return (
    <div>
      {user?.map((e) => {
        return (
          <EditUsersList
            key={e.id}
            email={e.email}
            id={e.id}
            isAdmin={e.isAdmin}
            name={e.name}
            password={e.password}
            phoneNumber={e.phoneNumber}
            photoURL={e.photoURL}
            uid={e.uid}
          />
        )
      })}
    </div>
  )
}

export default EditUsers
