import React from 'react'
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'

const index = () => {
    return (
        <div>
            <Menu />
            <Banner title="Nodes" subtitle="Summary" />
            <div className="m-3 p-3">
                <h1>Nodes</h1>
            </div>
        </div>
    )
}

export default index
