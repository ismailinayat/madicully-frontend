import React, {useState} from 'react'
import {useRouter} from 'next/router';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';


function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {

                //let token;
                //const user = auth.currentUser;

                const token = await auth.currentUser.getIdToken(true)
                console.log(token)
                
                const newUser = await axios.get('http://localhost:8000/api/v1/users/create', {
                    headers: {
                      Authorization: token
                    }
                  })
          
                console.log(newUser)

                router.push('/')
               
            }).catch((err) => {
            console.log(err)
        })
        
/*
        try {
            const newUser = await axios.post('http://localhost:8000/api/v1/users/create', {email, password})

            console.log(newUser)

            createUserWithEmailAndPassword(auth, uid: newUser.data.data._id, email, password);
        } catch (error) {
            console.log(error)
        }
*/
    }
    return (
    <div className='form-page'>
        <div className="container">

            <div className="form__heading">
                <h3> Sign up</h3>
            </div>

            <div className='form__container'>

                <form className="form" onSubmit={(e) => handleFormSubmit(e)}>

                    <div className="form__group">
                        <input type="text" className="form__input" id="name" placeholder='Email Address' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        <label htmlFor="name" className='form__label'>Email Address</label>
                    </div>

                    <div className="form__group">
                        <input type="password" className="form__input" id="password" placeholder='Password' required value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        <label htmlFor="password" className='form__label'>Password</label>
                    </div>

                    <div className="form__btn ">
                        <button className='btn btn--primary'>
                            Register
                        </button>
                       
                    </div>
                </form>


            </div>
        </div>
    </div>
  )
}

export default Register