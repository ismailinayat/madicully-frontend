import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {signOut, onAuthStateChanged} from '@firebase/auth';
import {auth} from '../firebase'

function Navbar() {




    const [userData, setUserData] = useState('')

    onAuthStateChanged(auth, (user) => {
        setUserData(user)
    })


    const handleLogout = () => {

        signOut(auth).then(() => {
            console.log('User signed out')
        })
    }
    

    return (
        <div className='navbar__container'>
            <div className="navbar">

                <div className="navbar__logo">

                    <Link href="/">
                        <a>
                            <h1>Madicully</h1>
                        </a>
                    </Link>
                </div>

                <div className="nav__links">

                    {

                    !userData ? 
                    <div className="login">

                        <Link href="login">
                            <a>Login</a>
                        </Link>

                    </div> : null
                    }

                    {


                    userData ? null :
                    <div className="register">

                        <Link href="/register">
                            <a>Register</a>
                        </Link>

                    </div>
                    }

                    {

                    userData ? 
                    <div className="logout">
                        
                        <p onClick={handleLogout}>Logout</p>
                        
                    </div> : null
                    }


                    
                </div>
            </div>
        </div>
    )
}

export default Navbar