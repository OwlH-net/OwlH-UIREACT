import React from 'react'
import Menu from '../Shared/Components/Menu/Menu'
import Banner from '../Shared/Components/Banner/Banner'

const Welcome = () => {
    return (
        <div>
            <Menu />            
            <br />
            <Banner title="Welcome" subtitle="Main menu" />
            <div>
                <h1 className="m-3 p-3">Welcome</h1>
            </div>
        </div>
    )
}

export default Welcome
