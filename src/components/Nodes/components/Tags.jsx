import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { SaveSelectedTags } from '../../../store/node/actions'
import { FaTrash } from "react-icons/fa";

const Tags = (props) => {   
    const [tagSearched, setTagSearched] = useState('')
    const [currentSuggestions, setCurrentSuggestions] = useState([])
    const [tagsList, setTagsList] = useState([])

    useEffect(() => {  

        if(props.nodeToEdit.id != undefined){           
            if(props.nodeToEdit.tags != ""){
                var editNodeTags = props.nodeToEdit.tags.split(",")
                setTagsList(editNodeTags);
            }      
        }
    },[])

    //add new tags. Not suggested tags
    const addTagsToList = () => {
        //check if tag already exists
        if(tagSearched != ''){
            var tagAlreadyExists = false
            Object.entries(tagsList || []).map(([id , val]) => {
                if(val == tagSearched){
                    tagAlreadyExists = true
                }
            })
            if(!tagAlreadyExists){
                //add new label to array
                setTagsList([...tagsList, tagSearched])
            }
            //save tags selected into store
            if(!tagsList.includes(tagSearched)){
                props.saveSelectedTags([...tagsList, tagSearched])
            }
            //restart input text label and suggestions
            setTagSearched('')
            setCurrentSuggestions([])
        }
    }

    //add suggested tags. Not new tags
    const addTagSuggested = (tag) => {
        //check if tag already exists
        if(tag != ""){
            var tagAlreadyExists = false
            Object.entries(tagsList || []).map(([id , val]) => {
                if(val == tag){
                    tagAlreadyExists = true
                }
            })
            if(!tagAlreadyExists){
                //add new label to array
                setTagsList([...tagsList, tag])            
            }
            //save tags selected into store
            if(!tagsList.includes(tag)){
                props.saveSelectedTags([...tagsList, tag])
            }
            //restart input text label and suggestions
            setTagSearched('')
            setCurrentSuggestions([])
        }
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

    const removeTag = (item) => {
        const newTagList = tagsList.filter(newTagList => newTagList != item);
        setTagsList(newTagList)
        props.saveSelectedTags(newTagList)
    }

    const suggestionsFiltered = Object.entries(currentSuggestions || []).map(([id , val]) => {
        return Object.entries(val || []).map(([objID , objVal]) => {
            return <span key={objID} id={objID} className="pointer badge bg-rounded bg-primary align-text-bottom text-white float-left mr-1" onClick={() => {addTagSuggested(objVal)}}> {objVal} </span>
        })        
    })

    const allTagsList = Object.entries(tagsList || []).map(([id , val]) => {
        return <span key={id} className="badge bg-rounded bg-secondary align-text-bottom text-white float-left mr-1">{val} &nbsp; 
                    <FaTrash onClick={() => {removeTag(val)}} size={15} className="iconRed pointer"/>
                </span>
    })

    return (
        <div>        
            <br/>
            <h4>Add Tags</h4>       
            <div className="input-group mt-3 container">
                <input className="form-control" type="text" placeholder="Search or add tag to node..." value={tagSearched} onChange={handleChange}/>
                <a className="btn btn-primary float-right text-decoration-none text-white" onClick={ ()=> {addTagsToList()}}>Add</a>
            </div>
            {suggestionsFiltered}
            <br />
            <br />
            {allTagsList}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        nodeToEdit: state.node.nodeToEdit,
        tagsSelected: state.node.tagsSelected,
    }
}

const mapDispatchToProps = (dispatch) => ({
    saveSelectedTags: (status) => dispatch(SaveSelectedTags(status)),
})

const withProps = connect(mapStateToProps,mapDispatchToProps);
export default withProps(Tags)   