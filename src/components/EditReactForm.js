import '../App.css';
import FirstLayer from './FirstLayer';
import MyEducation from './myEducation';
import MyExperience from './myExperience';
import MyProjects from './myProjects';
import MySkills from './mySkills';
import MyAchievements from './myAchievements';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { auth } from '../index';
import { signOut } from 'firebase/auth';

function EditReactForm(props) {

    const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState({});
  const {user, isLoading} = useUser();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      navigate('/');
    }).catch((err) => {
      console.log(err.message);
    })
  }

  useEffect(() => {(async () => {
        //console.log('hello');
            console.log(user);
            const token = user && await user.getIdToken();
            const response = await axios.get(`http://localhost:8000/api/portfolio/${props.id}`, {headers: {authtoken: token}});
            if(typeof(response.data) === 'object') {
              const dataRes = response.data;
              setData(dataRes);
              setIsReady(true);
            }
        })();
    }, [user]);
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const form = document.querySelector(".validated-form");
        console.log(form);
        const formData_empty = new FormData(form);
        const formData = {};
        for (const key of formData_empty.entries()) {
            if(!formData[key[0]]) formData[key[0]] = key[1];
            else if(typeof(formData[key[0]]) !== 'object') {
              formData[key[0]] = [formData[key[0]]];
              formData[key[0]].push(key[1]);
            } else {
              formData[key[0]].push(key[1]);
            }
        }
        console.log(formData);
        const config = {
          headers: {
            'authtoken': await user.getIdToken()
          }
        }
    
        const response = await axios.post(`http://localhost:8000/portfolio/edit/${props.id}`, formData, config)
        if(response.data === "Success") {
          window.location.href = `http://localhost:3000/portfolio`;
        } else {
          window.location.href = `http://localhost:3000/`;
        }
      }
      catch(err) {
        console.error(err);
      }
    }

    const handleDelete = async (e) => {
      e.preventDefault();
      const config = {
        headers: {
          'authtoken': await user.getIdToken()
        }
      }
    
      const response = await axios.post(`http://localhost:8000/portfolio/delete/${props.id}`, config);
      if(response.data === "Success") {
        window.location.href = `https://react-form-ten-steel.vercel.app/`;
      } else {
        window.location.href = 'http://localhost:3000/';
      }
    }
    
  return (
    <div className="App">
      <header className="App-header">
        {isLoading && <div>
          <h1 style={{color: "black"}}>Loading....</h1>
          </div>}
        {(isReady && user && user.uid === data.user_id) && <form enctype="application/json" novalidate className="validated-form">
          <FirstLayer name={data.name} description={data.description} profilePicture={data.profilePicture} linkedIn={data.linkedIn} instagram={data.instagram} telephone={data.telephone} email={data.email} mainDesignations={data.mainDesignations}/>
          <br></br>
          
          <MyEducation data={data.myEducation}/>
          <br></br>
          <MyExperience data={data.myExperience}/>
          <br></br>
          <MyProjects data={data.myProjects}/>
          <br></br>
          <MySkills data={data.mySkills}/>
          <br></br>
          <MyAchievements data={data.myAchievements}/>
          <button onClick={handleSubmit} className="btn btn-warning btn-lg m-3">Submit</button>
          <button onClick={e => handleLogout(e)} className="btn btn-warning btn-lg m-3">Logout</button>
          <button onClick={e => handleDelete(e)} className="btn btn-danger btn-lg m-3">Delete</button>
        </form>}
        {(!isLoading && user && (user.uid !== data.user_id)) && <div>
          <h1 style={{color: "black"}}>You can't perform this action</h1>
          </div>}
          {(!isLoading && !user) && <div>
          <h1 style={{color: "black"}}>You are not logged In</h1>
          <button onClick={() => navigate('login')} className="btn btn-warning btn-lg m-3">
              Log In
            </button>
            <button onClick={() => navigate("create-account")} className="btn btn-warning btn-lg m-3">
              Sign Up
            </button>
          </div>}
        <br></br>
      </header>
    </div>
  );
}

export default EditReactForm;
