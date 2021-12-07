import React, { useEffect } from "react";
import { useState } from "react";

function DateList ({contacts, currentUser, handleEvents}) {
    const [userContacts, setUserContacts] = useState([])

    
        if (contacts && currentUser) {
            console.log('inside if statement')
            console.log(currentUser)
            console.log(contacts)
    
            const filteredContacts = contacts.filter( contact => contact.user_id === currentUser.id)
            parseContacts(filteredContacts)
            // setUserContacts(filteredContacts) --this causes infinite loop rerener
        }
        
        function parseContacts (filteredContacts) {
            console.log('inside render method', filteredContacts)

            let parsedContacts = filteredContacts.map(contact => {
                return contact.important_dates.map( date => {
                        let this_year = "2021"
                        let original_date = date.date
                        let sliced_date = original_date.slice(4)
                        let new_date = this_year.concat(sliced_date)

                    return {title: date.date_title, date: new Date(new_date), allDay: true}
                })
            })
        

            let newArray = parsedContacts.flat()
            console.log(newArray)
            handleEvents(newArray)

                // let newArrayFirstMap = filteredContacts.map( contact => {
                //     let contactName = contact.first_name
                //     console.log('first level parse', contactName)

                //     let newArraySecondMap = []

                //     return (

                //         contact.important_dates.map( date => {
                //             let date_title = date.date_title
                //             // let split_date = original_date.split("-")

                //             console.log('2nd level map - event title', date_title)
                //             console.log('2nd level map - date', original_date)
                //             // console.log(typeof original_date)
                //             // console.log('split date', split_date)
                //             console.log('2nd level, new date:', new_date)

                //             let newObj = {
                //                 "event_date": new_date,
                //                 "event_title": date_title
                //             }

                //             return (
                //                 newArraySecondMap.push(newObj)
                //                 )
                                
                //             }, console.log('array after internal map', newArraySecondMap))
                //     )
                // }) 
                // console.log('should be completed full array', newArrayFirstMap)
                
        }

            // if (filteredContacts) {
                //     console.log('filtered user contacts state', filteredContacts)
        //     // get back an array of objects
        //     // where each object has object.important_dates
        //     // which is another array of objects

        //     // so i guess here we could start by mapping through to get each object's important date date
        //     // and then since we'll have the event title also, we can put them into a new array of objects, and send that up to app and over to the calendar!

            
        // }

        // const arrayOfObjects = []

        // return (
        //     userContacts.map( contact => {
        //         const contactName = contact.first_name

        //         const newObj = {}

        //         return (
        //             contact.important_dates.map( date => {
        //                 const dateDate = date.date
        //                 const dateTitle = date.date_type

                        
        //                 // return (
                        
        //                 //         newObj[]
                                
                                
                            
        //                 // )
        //             })
        //         )
        //     })
        // )

    return (
        <div>
            <h1>inside date list!</h1>
            {/* {renderContacts()} */}
            {/* {parseContacts()} */}
        </div>
    )
}

export default DateList;