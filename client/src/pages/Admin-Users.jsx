import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../store/auth';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./AdminUser.css";

function AdminUsers() {

  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json"
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Fetched data: ${data}`);
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`User After Delete: ${data}`);

      if (!response.ok) {
        throw new Error(`Delete failed with status: ${response.status}`);
      }


      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsersData();
  }, []);
  return (
    <>
      <section className='admin-user-section'>
        <div className="Usercontainer">
          <h1>Admin Users Data </h1>
        </div>
        <div className='Usercontainer admin-users'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>
                      <Link to={`/admin/users/update/${curUser._id}`} className="icon-button edit">
                        <i className="fas fa-edit"></i> Edit
                      </Link>
                    </td><td>
                      <button onClick={() => deleteUser(curUser._id)} className="icon-button delete">
                        <i className="fas fa-trash-alt"></i> Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )

}

export default AdminUsers