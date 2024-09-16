import React from 'react'
import { Spinner } from 'react-bootstrap'

function AuthSpinner() {
    return (
        <Spinner
            animation='border'
            role='status'
            style={{
                height: '28px',
                width: '28px',
            }}
        >
        </Spinner>
    )
}

export default AuthSpinner
