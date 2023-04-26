import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Button from '@mui/material/Button';
import { createServer } from "miragejs";
import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';

let server = createServer()
server.get("/api/users", { users: [
  { custName: "Mr Fraser Lomas", dob: "14/05/1985", emailAddress: "fraser.lomas@esgglobal.com", 
    address: "123 Fake Street Preston Lancashire PR2 5YB", telephone: "01772 111145", 
    altTelNo: ""
  }
] }
)

function App() {

  let [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.users)
      })
  }, [])

  const formik = useFormik({
    initialValues: {
      custName: "Mr Fraser Lomas", dob: "14/05/1985", emailAddress: "fraser.lomas@esgglobal.com", 
      address: "123 Fake Street Preston Lancashire PR2 5YB", telephone: "01772 111145", 
      altTelNo: ""
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="App">
      <div className='form container'>
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '40ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        >
            {users.map((user) => (
              <div>
                <div className='row header'>
                  <div className='col-md-6 header-left'>
                    <h2>Customer Details</h2><PersonOutlineOutlinedIcon/>
                  </div>
                  <div className='col-md-6 header-right'>
                    <Button variant="outlined" id="editBtn" type="submit">Edit</Button>
                  </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                      <TextField
                        id="outlined"
                        label="Customer Name"
                        name="custName"
                        onChange={formik.handleChange}
                        defaultValue={user.custName}
                      />
                      <TextField
                        id="outlined"
                        label="Date of Birth"
                        name= "dob"
                        onChange={formik.handleChange}
                        defaultValue={user.dob}
                      />
                      <TextField
                        id="outlined"
                        label="Email Address"
                        name="emailAddress"
                        onChange={formik.handleChange}
                        defaultValue={user.emailAddress}
                      />
                    </div>
                    <div className='col-md-4'>
                      <TextField
                        id="outlined-multiline-static"
                        label="Address"
                        multiline
                        rows={6}
                        name="address"
                        onChange={formik.handleChange}
                        defaultValue={user.address}
                      />
                    </div>
                    <div className='col-md-4'>
                      <TextField
                        id="outlined"
                        label="Telephone Number"
                        name="telephone"
                        onChange={formik.handleChange}
                        defaultValue={user.telephone}
                      />
                      <TextField
                        id="outlined"
                        label="Alt Telephone Number"
                        name="altTelNo"
                        onChange={formik.handleChange}
                        defaultValue={user.altTelNo}
                      />
                    </div>
                  </div>
              </div>
            ))}
          </Box>
      </div>
    </div>
  );
}

export default App;
