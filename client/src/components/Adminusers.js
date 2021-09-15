import React,{useState, useEffect} from 'react'
import axios from 'axios'



const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(()=> {
        const getallusers = async() => {
            const res = await axios.get('/api/users/getusers')
            setUsers(res.data)
        }
        getallusers()
    },[])

    return (
        <div>
            <div className='row'>
                <div className='col-md-12'>
                    <table className='table table-bordered table-black'>
                        <thead>
                            <tr>
                                <th>userid</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>isAdmin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length && users.map(user => {
                                return <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'YES':'NO'}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    )
}

export default Users;