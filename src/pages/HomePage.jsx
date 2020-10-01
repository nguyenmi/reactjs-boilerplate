import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';

const HomePage = () => {
  const [data, setData] = useState([]);
  const value1 = useFormInput('');
  const value2 = useFormInput('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const onChangeTex = (name, index) => e => {
    let result = [...data];
    result[index][name] = e.target.value;
    setData(result)
  }

  const clickBtn = (e) => {
    console.log(e)
  }
 
  return (
    <div>
      <div className='card-text'>
        <p className="text-primary">Value:</p>
        <input type="text" {...value1} />
      </div>
      <div className='card-text'>
        <p className="text-primary">Value 2:</p>
        <input type="text" {...value2} />
      </div>
      <div className="wrap-content">
        {!isEmpty(data) && data.map((item, index) => (
          <div className='card-body' key={index}>
            <div className="content-card">
              <h5 className='card-title'>
                <p className="text-primary">Name:</p>
                <input type="text" value={item.name} onChange={onChangeTex('name', index)}/>
              </h5>
              <div className='card-text'>
                <p className="text-primary">Username:</p>
                <input type="text" value={item.username} onChange={onChangeTex('username', index)}/>
              </div>
              <div className='card-text'>
                <p className="text-primary">Email:</p>
                <input type="text" value={item.email} onChange={onChangeTex('email', index)}/>
              </div>
              <button className='btn btn-primary' onClick={clickBtn}>Button</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  };
}

export default HomePage;
