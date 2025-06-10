import { useEffect, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from '../store/auth';
import { toast } from "react-toastify";


function AdminContacts() {

  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllContacts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("Fetched Contact", data);
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      next(error);
    }
  }

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`User After Delete: ${data}`);

      if (response.ok) {
        getAllContacts();
        toast.success("Deleted successfully");
      } else {
        toast.error("Not Deleted");

      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
      <h1>Admin Contact Data</h1>
      {contactData.map((currConData, index) => {

        const { username, email, _id } = currConData; // destructured the data so that we not to do it repeatedly
        return (
          <div key={index}>
            <p>{username}</p>
            <p>{email}</p>
            <button onClick={() => deleteContact(_id)} className="icon-button delete">
              <i className="fas fa-trash-alt"></i> Delete</button>
          </div>
        );
      })}
    </>
  )
}

export default AdminContacts;