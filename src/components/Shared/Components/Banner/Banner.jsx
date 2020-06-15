import React from 'react'

const Banner = (props) => {
    return (
        <div className="container">
        
            <br />
            <br />

            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-primary rounded shadow-sm">
            <div><img className="mr-3 bg-white" src="/assets/img/owlhwhite.png" alt="" height="48" /></div>
                
                <div className="lh-100">
                    <h3 className="mb-0 text-white lh-100">{props.title}</h3>
                    <small>{props.subtitle}</small>
                </div>
            </div>
        </div>
    )
}

export default Banner
