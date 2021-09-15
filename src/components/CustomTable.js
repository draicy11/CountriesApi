import React, { useEffect , useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from '@material-ui/core';

import Flag from "./Flag";
import axios from "axios";
import "./app.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


export default function CustomTable() {
  const classes = useStyles();
  const [countries, updateCountries] = useState([]);

  const fetchCountries=async()=>{
    const response = await axios('https://restcountries.eu/rest/v2/region/asia');
    updateCountries(response.data);
  }

  useEffect(() => {
    fetchCountries();
  },[]);

  function handleClick() {
    fetchCountries();
    console.log(countries);
  }
  


  return (
    <div>
      <div className="button">
      <Button variant="contained" onClick={handleClick}>Refresh</Button>
      </div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Capital</StyledTableCell>
            <StyledTableCell align="right">Flag</StyledTableCell>
            <StyledTableCell align="right">Region</StyledTableCell>
            <StyledTableCell align="right">Population</StyledTableCell>
            <StyledTableCell align="right">Borders</StyledTableCell>
            <StyledTableCell align="right">Languages</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor:"#6b8df1"}}>{
          countries && countries.map((country) => (
            <StyledTableRow key={country.name}>
               <StyledTableCell component="th" scope="row">
                {country.name}
              </StyledTableCell>
              <StyledTableCell align="right">{country.capital}</StyledTableCell>
              <StyledTableCell align="right"><Flag url={country.flag} /></StyledTableCell>
              <StyledTableCell align="right">{country.region}</StyledTableCell>
              <StyledTableCell align="right">{country.population}</StyledTableCell>
              <StyledTableCell align="right">{country.borders.map((border)=>{return border+" "})}</StyledTableCell>
              <StyledTableCell align="right">{country.languages.map((lang)=>{return lang.name + " "})}</StyledTableCell>
            </StyledTableRow>
          ))
        }
          
        </TableBody>
      </Table>
    </TableContainer>
    </div>
     
  );
}
