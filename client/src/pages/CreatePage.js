import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
    
    const history = useHistory()
    const auth = useContext(AuthContext)

    const { request } = useHttp()

    useEffect(() => {
        window.M.updateTextFields()
    })

    const [link, setLink] = useState('')

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {

                const data = await request(
                    '/api/link/generate', 'POST', { from: link }, { Authorization: `Bearer ${ auth.token }` 
                })
                
                history.push(`/detail/${ data.link._id }`)

            } catch (e) { }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ "paddingTop": '2rem' }}>
                <h4>CreatePage</h4>

                <div className="input-field">
                    <input 
                        style={{ "margin": '10px 0 0 0' }}
                        placeholder="введит ссылку" 
                        id="email" 
                        type="text" 
                        name="email"
                        value={ link }
                        onChange={ e => setLink(e.target.value) }
                        onKeyPress={ pressHandler }
                    />
                    {/* <label htmlFor="email" className="text-lighten-5" id={ link }>ссылка</label> */}
                </div>
            </div>
        </div>
    )    
}