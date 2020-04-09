import React from 'react'

export const LinkCard = ({ link }) => {
    return (
        <>
            <h4>Ссылка</h4>
          
            <p>ваша ссылка: <a href={ link.to } target="_blank" rel="noopener noreferrer"> { link.to } </a></p>
            <p>откуда: <a href={ link.from } target="_blank" rel="noopener noreferrer"> { link.from } </a></p>
            <p>клики: <strong>{ link.clicks }</strong></p>
            <p>дата создания <strong>{ new Date(link.date).toLocaleDateString() }</strong></p>
        </>
    )
}