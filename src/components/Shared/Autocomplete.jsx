import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { SelectedTag } from '../../store/webUtilities/actions'

const Autocomplete = (props) => {   
    const [tagSearched, setTagSearched] = useState('')
    const [currentSuggestions, setCurrentSuggestions] = useState([])

    const saveSuggestionSelected = (uuid, tag) => {
        var data = {}
        data[uuid] = tag
        props.selectedTag(data)
    }

    const handleChange = (e) => {
        setTagSearched(event.target.value)
        setCurrentSuggestions([])

        var data = {}
        Object.entries(props.suggestions || []).map(([id , tag]) => {
            if(event.target.value.length >= 3 && tag.tagName.toLowerCase().includes(event.target.value.toLowerCase())){
                data[id] = tag.tagName
            }
        })
        setCurrentSuggestions([data])
    }

    const suggestionsFiltered = Object.entries(currentSuggestions || []).map(([id , val]) => {
        return Object.entries(val || []).map(([objID , objVal]) => {
            return <p key={objID} id={objID} className="pointer badge bg-rounded bg-primary align-text-bottom text-white float-left mr-1" onClick={() => {saveSuggestionSelected(objID, objVal)}}> {objVal} </p>
        })        
    })

    return (
        <div>            
            <div className="input-group mt-3 container">
                <input className="form-control" type="text" placeholder="Search or add tag to node..." value={tagSearched} onChange={handleChange}/>
                <a className="btn btn-primary float-right text-decoration-none text-white" onClick={ ()=> {}}>Add</a>
            </div>
            {suggestionsFiltered}
            <br />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    selectedTag: (status) => dispatch(SelectedTag(status)),
})

const withProps = connect(null,mapDispatchToProps);
export default withProps(Autocomplete)   