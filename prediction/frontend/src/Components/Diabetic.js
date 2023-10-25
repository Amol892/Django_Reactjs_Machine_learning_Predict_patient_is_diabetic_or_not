import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import Result from './Result'
import Popup from 'reactjs-popup';

function Diabetic() {

    const {register,handleSubmit}=useForm()
    const [user,setUser]=useState([])
    const [message,setMessage]=useState([])
    const [error,setError] = useState([])

    

    function saveData(data){
        axios.post('http://localhost:8000/patient/predict/',data).then(response=>{
            const P_data = response.data.prediction
            
            setUser(response.data)
            setMessage(response.data.message)
            if(P_data === 1){
                alert('you are diabetic patient')
            }else{
                alert('you are Not diabetic patient')
            }
            
           
        }).catch(error=>{
            
        })
        
    }

  return (
   <>
   <div className='container' style={{backgroundColor:'lightblue',borderRadius:10,width:700}}>
    <center>
    <h1>Check your are diabetic or not</h1><hr/>
    </center>
    
    <form onSubmit={handleSubmit(saveData)}> 
        <lebel>Pregnancies</lebel>
        <input type='text' name='prg' className='form-control' {...register('Pregnancies')}/><br/>
        
        <lebel>Glucose</lebel>
        <input type='text' name='glu' className='form-control' {...register('Glucose')}/><br/>

        <lebel>BloodPressure</lebel>
        <input type='text' name='bp' className='form-control' {...register('BloodPressure')}/><br/>

        <lebel>SkinThickness</lebel>
        <input type='text' name='st' className='form-control' {...register('SkinThickness')}/><br/>

        <lebel>Insulin</lebel>
        <input type='text' name='ins' className='form-control' {...register('Insulin')}/><br/>

        <lebel>BMI</lebel>
        <input type='text' name='bmi' className='form-control' {...register('BMI')}/><br/>

        <lebel>DiabetesPedigreeFunction</lebel>
        <input type='text' name='dpf' className='form-control' {...register('DiabetesPedigreeFunction')}/><br/>

        <lebel>Age</lebel>
        <input type='text' name='ag' className='form-control' {...register('Age')}/><br/>

        <center>
        <input type="submit" value='Check you are diabetic or not' className='btn btn-success col-6'/><br/><br/>
        </center>
    </form>
    </div>
   </>

  )
}

export default Diabetic