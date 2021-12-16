import React from 'react';
import Modal from 'react-modal'
import { useState } from 'react';
import { useNavigate } from 'react-router';

function ContactCard ({contact}) {
    let navigate = useNavigate();
    const [contactDOB, setContactDOB] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newDateForm, setNewDateForm] = useState({
        contact_id: contact.id,
        date: "",
        date_type: "",
        date_title: "",
        image_url: "",
        notes: ""
    })

    function handleDeleteContact () {
        fetch(`/api/contacts/${contact.id}`, {
            method: "DELETE"
        })
        .then(() => {
            setModalIsOpen(false)
            window.location.reload()
        })
    }

    function handleDateChange (event) {
        setNewDateForm({
            ...newDateForm, [event.target.name]: event.target.value
        })
    }

    function handleDateSubmit (event) {
        event.preventDefault();

        // fetch POST to importantdates controller #create method
        fetch('/api/important_dates', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDateForm)
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data)
                    closeModal()
                    window.location.reload()
                })
            }
        })
    }

    function handleAddDateClick () {
        let form = document.getElementById('addNewDateForm')
        form.classList.toggle('hidden')
    }

    function openModal () {
        setModalIsOpen(true)
    }

    function closeModal () {
        setModalIsOpen(false)
    }

    function renderImportantDatesInModal () {
        return (
            contact.important_dates.map( date => {
                return (
                    <div className="row justify-content-evenly">
                        <br />
                        <div class="col-4">
                            <div className="img-thumbnail-container">
                                <img id="important-date-image" className="img-thumbnail" src={date.image_url} alt="pic of invitation" />
                            </div>
                            <p><i>Picture of the invitation</i></p>
                        </div>
                        <div class="col-4">
                            <h4>{date.date_title}</h4>
                            <h5>Date: {date.date}</h5>
                            <br />
                            <p>Notes: {date.notes}</p>
                        </div>
                    </div>
                )
            })
        )
    }
        
    const result = contact.important_dates.filter(eachObj => eachObj.date_type === "birthday")
    const contact_birthday = result[0].date

    function getBirthdayAndAge () {
        const dob = new Date(contact_birthday);
        const difference = Date.now() - dob.getTime();

        const ageDate = new Date(difference)
        const calculatedAge = Math.abs(ageDate.getUTCFullYear()- 1970)
        
            return (
                <div>
                    <p>Born on {contact_birthday}</p>
                    <p>Turning {calculatedAge} this year!</p>
                </div>
            )
    }

    return (
        <div className="container">
            <div className="contact-individual">
                <h1>{contact.first_name} {contact.last_name}</h1>
                {getBirthdayAndAge()}
                <button type="button" className="btn btn-outline-dark" onClick={openModal}>Expand</button>
            </div>

            <div id="expanded-card-modal" className="modal-dialog modal-sm">
                <Modal isOpen={modalIsOpen} >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">{contact.first_name} {contact.last_name}'s Info</h2>
                        </div>
                        <div className="modal-body">
                            <img src={contact.image_url} className="img-thumbnail" />
                            <h3>{contact.first_name} {contact.last_name} (<i>{contact.notes}</i>)</h3>
                            <h3>Birthdate: {contact_birthday}</h3>
                        </div>
                        <div className="modal-body">
                            <h3 className="modal-title">{contact.first_name}'s Important Dates:</h3>
                            <br />
                            {renderImportantDatesInModal()}
                            <br /><br />

                            <form id="addNewDateForm" className="hidden" onSubmit={handleDateSubmit}>
                                <h4>Add another important date of {contact.first_name}'s</h4>

                                <div className="mb-3">
                                    <label className="form-label">Date</label>
                                    <input type="date" className="form-control" name="date" 
                                    onChange={handleDateChange} value={newDateForm.date} 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Event Title and Type</label>
                                    <input type="text" className="form-control" name="date_title" 
                                    onChange={handleDateChange} value={newDateForm.date_title} 
                                    />
                                </div>

                                <div className="mb-3">
                                    <select className="form-select" aria-label="Default select example" name="date_type" onChange={handleDateChange}>
                                        <option defaultValue>What's the occasion?</option>
                                        <option value="birthday">Birthday</option>
                                        <option value="anniversary">Anniversary</option>
                                        <option value="graduation">Graduation</option>
                                        <option value="wedding">Wedding</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Image URL</label>
                                    <input type="text" className="form-control" name="image_url" 
                                    placeholder="save a pic of the event invite!"
                                    onChange={handleDateChange} value={newDateForm.image_url} 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Notes</label>
                                    <input type="text" className="form-control" name="notes" 
                                    placeholder="anything you want to jot down?"
                                    onChange={handleDateChange} value={newDateForm.notes} 
                                    />
                                </div>

                                <button type="submit" className="btn btn-sm btn-outline-dark">Save</button>

                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-outline-primary"  data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-sm btn-outline-warning" onClick={handleAddDateClick}>Add New Date</button>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleDeleteContact}>Delete Contact</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
        )
}

export default ContactCard;


