import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { action } from '../redux/action';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import '../App.css';



const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

function mapStateToProps(state) {
    return {
        detailUser: state.userDetails.detailUser
    }
}

const mapDispatchToProps = (dispatch) => ({
    setDetailUser: (obj) => dispatch(action.setDetailUser(obj))
})



export default connect(mapStateToProps, mapDispatchToProps)(function Info(props) {
    const { detailUser } = props;
    const [table, setTable] = useState([]);
    const [copyTable, setCopyTable] = useState([]);
    const [searched, setSearched] = useState("");
    const [percent, setPercent] = useState(0);
    const [filteredRows, setFilteredRows] = useState([]);
    const [percentOfDeadLine, setpercentOfDeadLine] = useState(0);
    const [averageMarks, setAverageMarks] = useState(0);


    const requestSearch = (searchedVal) => {
        if (searchedVal == "") {
            setPercent(searchedVal);
            setFilteredRows(copyTable);
        }
        else {
            setPercent(searchedVal);
            debugger
            setFilteredRows(copyTable.filter((row) => {
                return row.name.toLowerCase().includes(searchedVal.toLowerCase());
            }))
        }
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    useEffect(() => {
        setTable(filteredRows);
        var countLines = filteredRows.length;
        var count = 0;
        var sumOfMarks = 0;
        filteredRows.map(t => t.madeDadeline ? count++ : count);
        filteredRows.map(t => sumOfMarks += t.score);
        setAverageMarks(Math.round((sumOfMarks / countLines) * 100) / 100);
        setpercentOfDeadLine(Math.round((count / countLines) * 100) / 100);
    }, [percent])

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${detailUser.token}` }
        };
        const arr = [];
        axios.get("https://private-052d6-testapi4528.apiary-mock.com/info ", config)
            .then((respose) => {
                console.log(respose.data);
                const myData = respose.data
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item, i) => arr.push(item));
                setTable(arr);
                setCopyTable(arr);
                var countLines = arr.length;
                var count = 0;
                var sumOfMarks = 0;
                arr.map(t => t.madeDadeline ? count++ : count);
                arr.map(t => sumOfMarks += t.score);
                setpercentOfDeadLine(Math.round((count / countLines) * 100) / 100);
                setAverageMarks(Math.round((sumOfMarks / countLines) * 100) / 100);
            });
    }, [])
    
    const rowColor = (score) => {
        if (score < 70) {
            return 'red';
        } else if (score > 90) {
            return 'green';
        } else {
            return 'white';
        }
    }

    const classes = useStyles();

    return (<>
        {detailUser ?
            <div className="card" style={{ width: "18%", marginLeft: "42%", marginBottom: "2%", marginTop: "2%", textAlign: "right", borderColor: "black", borderWidth: "1px", borderStyle: "groove" }}>
                <img className="card-img-top" src={detailUser.personalDetails.avatar} alt="Card image cap" style={{ width: "100%" }} />
                <div className="card-body">
                    <h5 className="card-title" style={{ textAlign: "center" }}> Name: {detailUser.personalDetails.name}</h5>
                    <p className="card-text" style={{ textAlign: "center" }}>Team: {detailUser.personalDetails.Team}</p>
                    <p className="card-text" style={{ textAlign: "center" }}>JoinedAt: {detailUser.personalDetails.joinedAt}</p>
                </div>
            </div> : ""}


        {
            table ?
                <Paper width={"50%"}>
                    {percentOfDeadLine ? <h3>אחוז הפרוייקטים שעמדו בדדליין: {percentOfDeadLine}% ממוצע הציונים הינו: {averageMarks}</h3> : ""}
                    <SearchBar
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    />
                    <TableContainer>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Score</TableCell>
                                    <TableCell align="right">DurationInDays</TableCell>
                                    <TableCell align="right">BugsCount</TableCell>
                                    <TableCell align="right">MadeDadeline</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    table ?
                                        table.map((row) => (
                                            <TableRow key={row.id} className={rowColor(row.score)}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.score}</TableCell>
                                                <TableCell align="right">{row.durationInDays}</TableCell>
                                                <TableCell align="right">{row.bugsCount}</TableCell>
                                                <TableCell align="right"> {row.madeDadeline ? "true" : "false"}</TableCell>
                                            </TableRow>
                                        )) : ""

                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                : ""
        }
    </>)
}
)