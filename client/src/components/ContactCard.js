import React from 'react';
import Modal from 'react-modal'
import { useState } from 'react';
import { useNavigate } from 'react-router';

function ContactCard ({contact}) {
    let navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function handleDeleteContact () {
        console.log('clicked delete', contact)

        // fetch delete 
        // redirect to /contactlist
        fetch(`/api/contacts/${contact.id}`, {
            method: "DELETE"
        })
        .then(() => {
            setModalIsOpen(false)
            window.location.reload()
        })
    }

    function handleEditContact () {
        console.log('clicked edit', contact)
    }

    function openModal () {
        setModalIsOpen(true)
    }

    function closeModal () {
        setModalIsOpen(false)
    }

    function renderImportantDates () {
        return (
            contact.important_dates.map( date => {
                return (
                    <div>
                        <h2>{date.date_type}</h2>
                        <h2>{date.date}</h2>
                        <h2>{date.notes}</h2>
                    </div>
                )
            })

        )
    }

    function calculateAge () {
        const dob = new Date(contact.full_birthdate);
        const difference = Date.now() - dob.getTime();

        const ageDate = new Date(difference)
        const calculatedAge = Math.abs(ageDate.getUTCFullYear()- 1970)

        return <p>Turning {calculatedAge} this year!</p>
    }

    return (
        <>
            <div className="contact-individual">
                <h1>{contact.first_name} {contact.last_name}</h1>
                <p>Born on {contact.full_birthdate}</p>
                {calculateAge()}
                <button onClick={openModal}>Expand</button>
            </div>

            <div class="modal-dialog modal-lg">
                <Modal isOpen={modalIsOpen} >
                    <div>
                        <button onClick={handleEditContact}>Edit</button>
                        <button onClick={handleDeleteContact}>Delete</button>
                        <button onClick={closeModal}>Close</button>
                    </div>

                    <div>
                        <img src={contact.image_url} class="img-thumbnail" />
                        <h1>{contact.first_name} {contact.last_name}</h1>
                        <h2>Birthdate: {contact.full_birthdate}</h2>
                        ------------------------------------
                        {renderImportantDates()}
                    </div>

                </Modal>
            </div>
        </>
        )
}

export default ContactCard;