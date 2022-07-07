import React, {useState} from 'react'
import {useRouter} from 'next/router';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase';
function Login() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleFormSubmit = (e) => {

        e.preventDefault()

            signInWithEmailAndPassword(auth, email, password).then(() => {
                router.push('/')
            }).
            catch(err => {
            console.log(err.message)
        }) 
    }

    return (
        <div className='form-page'>
            <div className="container">

                <div className="form__heading">
                    <h3>Login</h3>
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
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login