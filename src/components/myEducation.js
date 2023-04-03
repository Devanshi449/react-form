import React, { useState } from "react";
import { Container } from "react-bootstrap";

function MyEducation(props) {
  const [inputList, setinputList]= useState(props.data);

  const handleinputchange=(e, index)=>{
    const {name, value}= e.target;
    const list= [...inputList];
    list[index][name]= value;
    setinputList(list);

  }
 
  const handleremove= (event, index)=>{
    event.preventDefault();
    const list=[...inputList];
    list.splice(index,1);
    setinputList(list);
  }

  const handleaddclick=()=>{ 
    setinputList([...inputList, {institutionName: "", place: "", year: "", aggregate: "", coursePursuied: ""}]);
  }
  return (
    <Container className="content m-3">
      
     <div className="row card shadow-lg bg-body rounded">
     
       <div className="col-sm-12 box pt-3">
         <h2>Education</h2>
           
            { 
            inputList.map( (x,i)=>{
              return(
              <div className="row">
                <div className="form-group col-md-4">
                 <label >Institution Name: </label>
                  <input type="text"  name="institutionName" className="form-control"  placeholder="Enter Institution" onChange={ e=>handleinputchange(e,i)} value={x.institutionName} />
               </div>
               
               
                 <div className="form-group col-md-4">
                 <label >Year: </label>
                  <input type="number"  name="year" className="form-control"  placeholder="Enter end year" onChange={ e=>handleinputchange(e,i)} value={x.year} />
               </div>

       
                 <div className="form-group col-md-4">
                 <label >Place: </label>
                  <input type="text"  name="place" className="form-control"  placeholder="Enter place" onChange={ e=>handleinputchange(e,i)} value={x.place} />
               </div>

               
                 <div className="form-group col-md-4">
                 <label >Aggregate: </label>
                  <input type="number" step="0.01"  name="aggregate" className="form-control"  placeholder="Enter aggregate" onChange={ e=>handleinputchange(e,i)} value={x.aggregate} />
               </div>

               
                 <div className="form-group col-md-4">
                 <label >Course Pursuied: </label>
                  <input type="text"  name="coursePursuied" className="form-control"  placeholder="Enter courage pursuied" onChange={ e=>handleinputchange(e,i)} value={x.coursePursuied} />
               </div>

               <div className="form-group col-md-2 mt-4">
               {
                  inputList.length!==1 &&
                  <button  className="btn btn-danger mx-1" onClick={(e)=> handleremove(e, i)}>Remove</button>
               }
               { inputList.length-1===i &&
               <button  className="btn btn-success m-1" onClick={ handleaddclick}>Add More</button>
               }
               </div>
            </div>
              );
            })}

               
       </div>
     </div>
    </Container>
  );
}
export default MyEducation;