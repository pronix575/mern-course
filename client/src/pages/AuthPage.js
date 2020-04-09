import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hooks'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {

    const auth = useContext(AuthContext)

    const message = useMessage()
    
    const { loading, error, request, clearError } = useHttp()

    const [ form , setForm ] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form })

        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form })

            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div className="row">            
            <div className="col s6 offset-s3">
                <h4>Сократи ссылку</h4>
                <div className="card blue darken-1">
                
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                    
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="введит email" 
                                    id="email" 
                                    type="text" 
                                    name="email"
                                    className="flow-input"
                                    onChange={ changeHandler }
                                    value={ form.email }
                                />
                                <label htmlFor="email" className="text-lighten-5">email</label>
                            </div>

                            <div className="input-field">
                                <input 
                                    placeholder="введит пароль" 
                                    id="password" 
                                    type="password"
                                    name="password" 
                                    className="flow-input"
                                    value={ form.password }
                                    onChange={ changeHandler }
                                />
                                <label htmlFor="email" className="text-lighten-5">password</label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4" 
                            onClick={ loginHandler }
                            disabled={ loading }>
                                Войти
                        </button>

                        <button 
                            className="btn blue darken-4" 
                            style={{ "margin": '0 0 0 10px' }} 
                            onClick={registerHandler} disabled={ loading }>
                                Регистрация
                        </button>
                        
                    </div>
                     
                </div>
            </div>
        </div>
    )    
}