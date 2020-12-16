import React from 'react'
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import OrganizationPanel from './OrganizationPanel'

const index = () => {
    return (
        <div>
            <Menu />
            <Banner title="Config" subtitle="Configuration panel" />
            <div className="m-3 p-3">
                <OrganizationPanel />
            </div>
        </div>
    )
}

export default index
