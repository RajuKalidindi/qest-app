import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

// Sample data
const rawMembers =
    [{"firstname":"John","lastname":"Doe","email":"john.doe@example.com","mobile":"1234567890","city":"New York","state":"NY","pincode":"10001","dateOfBirth":"1990-01-01","gender":"Male"},{"firstname":"Jane","lastname":"Smith","email":"jane.smith@example.com","mobile":"2345678901","city":"Los Angeles","state":"CA","pincode":"90001","dateOfBirth":"1992-02-02","gender":"Female"},{"firstname":"Alice","lastname":"Johnson","email":"alice.johnson@example.com","mobile":"3456789012","city":"Chicago","state":"IL","pincode":"60601","dateOfBirth":"1994-03-03","gender":"Female"},{"firstname":"Bob","lastname":"Brown","email":"bob.brown@example.com","mobile":"4567890123","city":"Houston","state":"TX","pincode":"77001","dateOfBirth":"1991-04-04","gender":"Male"},{"firstname":"Charlie","lastname":"Davis","email":"charlie.davis@example.com","mobile":"5678901234","city":"Phoenix","state":"AZ","pincode":"85001","dateOfBirth":"1993-05-05","gender":"Male"},{"firstname":"Daisy","lastname":"Miller","email":"daisy.miller@example.com","mobile":"6789012345","city":"Philadelphia","state":"PA","pincode":"19019","dateOfBirth":"1995-06-06","gender":"Female"},{"firstname":"Edward","lastname":"Wilson","email":"edward.wilson@example.com","mobile":"7890123456","city":"San Antonio","state":"TX","pincode":"78201","dateOfBirth":"1996-07-07","gender":"Male"},{"firstname":"Fiona","lastname":"Moore","email":"fiona.moore@example.com","mobile":"8901234567","city":"San Diego","state":"CA","pincode":"92101","dateOfBirth":"1997-08-08","gender":"Female"},{"firstname":"George","lastname":"Taylor","email":"george.taylor@example.com","mobile":"9012345678","city":"Dallas","state":"TX","pincode":"75201","dateOfBirth":"1998-09-09","gender":"Male"},{"firstname":"Hannah","lastname":"Anderson","email":"hannah.anderson@example.com","mobile":"0123456789","city":"San Jose","state":"CA","pincode":"95101","dateOfBirth":"1999-10-10","gender":"Female"}];

// Utility function to calculate age in years and months
const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const years = today.getFullYear() - birthDate.getFullYear();
  const months = today.getMonth() - birthDate.getMonth();
  return `${years} yrs ${months} mns`;
}

// Process the raw data
const members = rawMembers.map(member => ({
  name: `${member.firstname} ${member.lastname}`,
  email: member.email,
  mobile: member.mobile,
  location: `${member.city}, ${member.state}, ${member.pincode}`,
  age: calculateAge(member.dateOfBirth),
  gender: member.gender
}));

const cities = ["All Cities", ...new Set(rawMembers.map(member => member.city))];
const genders = ["All Genders", "Male", "Female"];

const MemberList = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [genderFilter, setGenderFilter] = useState("All Genders");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">ALL MEMBERS</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <TextField
            fullWidth
            placeholder="Search by name..."
            variant="outlined"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            sx={{
            maxWidth: '375px',
            flex: '1 1 auto',
            borderRadius: '10px',
            '& .MuiOutlinedInput-root': { borderRadius: '10px' },
            }}
        />

        <FormControl sx={{ maxWidth: '255px', flex: '1 1 auto' }}>
            <InputLabel>City</InputLabel>
            <Select
            value={cityFilter}
            label="City"
            onChange={(e) => setCityFilter(e.target.value)}
            sx={{ borderRadius: '10px', '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            >
            {cities.map(city => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
            </Select>
        </FormControl>

        <FormControl sx={{ maxWidth: '255px', flex: '1 1 auto' }}>
            <InputLabel>Gender</InputLabel>
            <Select
            value={genderFilter}
            label="Gender"
            onChange={(e) => setGenderFilter(e.target.value)}
            sx={{ borderRadius: '10px', '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            >
            {genders.map(gender => (
                <MenuItem key={gender} value={gender}>{gender}</MenuItem>
            ))}
            </Select>
        </FormControl>
    </div>


      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.filter(member =>
                (nameFilter === "" || member.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
                (cityFilter === "All Cities" || member.location.includes(cityFilter)) &&
                (genderFilter === "All Genders" || member.gender === genderFilter)
            ).map((member, index) => (
                <TableRow 
                key={index} 
                className={`${index % 2 === 0 ? 'bg-white text-gray-800' : 'bg-gray-200 text-black'}`}
                >
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.mobile}</TableCell>
                <TableCell>{member.location}</TableCell>
                <TableCell>{member.age}</TableCell>
                <TableCell>{member.gender}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MemberList;