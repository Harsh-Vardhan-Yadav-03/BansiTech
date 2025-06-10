import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "./Admin-Update.css";

function AdminUpdate() {
    const [data, setData] = useState({
        username: "",
        email: "",
    });

    const params = useParams();
    console.log("params single user: ", params);
    const { authorizationToken } = useAuth();

    //get single user data
    const getSingleUserData = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/admin/users/update/${params.id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                }
            );
            const data = await response.json();
            console.log(`uses single data: ${data}`);
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, []);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    };

    //to update the data dynamically
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:5000/api/admin/users/update/${params.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorizationToken,
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                toast.success("Updated successfully");
            } else {
                toast.error("Not Updated");

            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section className="container">
                <div>
                    <h1 className="heading">Upadte User Data</h1>
                </div>
                <div>
                    <section>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="inputGroup">
                                <label htmlFor="username"className="label">Username</label>
                                <input type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    value={data.username}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="email" className="label">Email</label>
                                <input type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={data.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <button type="submit" className="button">Update</button>
                            </div>
                        </form>
                    </section>
                </div>
            </section>
        </>
    )
}

export default AdminUpdate;

