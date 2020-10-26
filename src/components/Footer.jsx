import React from 'react'

import '../styles/Footer.scss'

import logo from '../images/Logo.svg'

const Footer = props => {
    const { isMinimized, setIsMinimized } = props

    const renderFooter = () => {
        if (isMinimized) {
            return (
                <img
                    src={logo}
                    alt="logo"
                    onClick={() => setIsMinimized(!isMinimized)}
                />
            )
        }

        return (
            <>
                <div className="text">
                    <h1 className="title">NOTERIST</h1>
                    <p className="author">MADE BY KEVIN PEREDO</p>
                </div>
                <img
                    src={logo}
                    alt="logo"
                    onClick={() => setIsMinimized(!isMinimized)}
                />
            </>
        )
    }

    return (
        <div className={`footer ${isMinimized ? 'minimized' : ''}`}>
            {renderFooter()}
        </div>
    )
}

export default Footer