import { useState } from "react";
import './Contact.css'

export const Contact = () => {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(contact);
    };

    return (
        <>
            <section className="section-contact">
                <div>
                    <h1 className="main_heading">Contact Us</h1>
                </div>

                <div className="container_contact grid grid-two-cols">
                    <div>
                        <img className="contact_img" src="./public/images/Contact-image.jpg" alt="we are always ready to help" />
                    </div>

                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="lbl_contact" htmlFor="username">username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    value={contact.username}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label className="lbl_contact" htmlFor="email">email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={contact.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label className="lbl_contact" htmlFor="message">message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    autoComplete="off"
                                    value={contact.message}
                                    onChange={handleInput}
                                    required
                                    cols="30"
                                    rows="6"
                                ></textarea>
                            </div>

                            <div>
                                <button className="btn_contact" type="submit">submit</button>
                            </div>
                        </form>
                    </section>
                </div>

            </section>
        </>
    );
};

export default Contact