import React from 'react'

const Banner = (props) => {
    return (
        <div className="container">    
            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-low-blue rounded shadow-sm">
            <div><img className="mr-3" src="/assets/img/owlhwhite.png" alt="" height="48" /></div>
                
                <div className="lh-100">
                    <h3 className="mb-0 text-white lh-100">{props.title}</h3>
                    <small>{props.subtitle}</small>
                </div>
            </div>
        </div>
    )
}

export default Banner
