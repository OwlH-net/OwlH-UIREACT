import React from 'react'
import Loader from 'react-loader-spinner'

const Spinner = () => (
    <Loader
        type="Watch"
        color="#FFFFFF"
        height={25}
        width={25}
        timeout={30000}
    />
)

export default Spinner;