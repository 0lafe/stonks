import React from "react"

const UserPage = ({ user }) => {
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                {user ? 
                <h3>Welcome {user.email}!</h3>
            : null}
            </div>
        </>
    )
}

export default UserPage