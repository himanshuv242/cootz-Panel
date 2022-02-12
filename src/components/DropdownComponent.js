import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Table from "react-bootstrap/Table";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";

const DropdownComponent = () => {
  const [item, setItem] = useState([]);

  const [individual, setindividual] = useState();

  const fetchData = () => {
    fetch("http://cootz-backend-api.herokuapp.com/getallcontests")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItem(data);
      });
  };

  // console.log(item);

  const [questions, setQuestions] = useState([]);

  const fetchQuestions = () => {
    fetch("http://cootz-backend-api.herokuapp.com/getques")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      });
  };

  //Pagination handle clicks
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };

  const handleLoadLess = () => {
    if (itemsPerPage > 5) setitemsPerPage(itemsPerPage - 5);
  };

  //PAGINSTION STATES

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  //State to show limited page numbers
  const [pageNumberLimit, setpageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(questions.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

  //Showing dots to let user know more pages to go
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  //Component to render page numbers
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  useEffect(() => {
    fetchData();
    fetchQuestions();
  }, []);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          style={{ fontSize: "12px", fontWeight: "600" }}
        >
          SELECT CONTEST TYPE
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {item.map((bata) => {
            return (
              <Dropdown.Item
                key={bata._id}
                onClick={() => setindividual(bata._id)}
              >
                {bata.constestType} : {bata.contestsubType}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>

      <div className="contestDetails my-2">
        <Accordion style={{ width: 400 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            {item.map((bata) => {
              if (bata._id === individual) {
                return (
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    No. of questions to be selected = {bata.totalquestion}
                  </Typography>
                );
              }
            })}
          </AccordionSummary>
          <AccordionDetails>
            
              {item.map((bata) => {
                if (bata._id === individual) {
                  return (
                    <div>
                      <Table striped bordered hover variant="dark" style={{fontSize:'15px'}}>
                        <tbody>
                          <tr>
                            <td>Id</td>
                            <td>{bata._id}</td>
                          </tr>

                          <tr>
                            <td>ContestType</td>
                            <td>{bata.constestType}</td>
                          </tr>

                          <tr>
                            <td>ContestSubType</td>
                            <td>{bata.contestsubType}</td>
                          </tr>

                          <tr>
                            <td>Sponsered</td>
                            <td>{bata.sponsered}</td>
                          </tr>

                          <tr>
                            <td>TotalPlayers</td>
                            <td>{bata.totalPlayers}</td>
                          </tr>
                          <tr>
                            <td>StartDate</td>
                            <td>{bata.startdate}</td>
                          </tr>

                          <tr>
                            <td>EndDate</td>
                            <td>{bata.enddate}</td>
                          </tr>

                          <tr>
                            <td>TotalTimeInMinutes</td>
                            <td>{bata.TotalTimeInMinute}</td>
                          </tr>

                          <tr>
                            <td>Status</td>
                            <td>{bata.status}</td>
                          </tr>
                          <tr>
                            <td>ContestName</td>
                            <td>{bata.contestName}</td>
                          </tr>
                          <tr>
                            <td>EntryFee</td>
                            <td>{bata.entryFee}</td>
                          </tr>

                          <tr>
                            <td>WinningAmount</td>
                            <td>{bata.winningamount}</td>
                          </tr>
                          <tr>
                            <td>Created at</td>
                            <td>{bata.createdAt}</td>
                          </tr>
                          <tr>
                            <td>Updated at</td>
                            <td colSpan={2}>{bata.updatedAt}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  );
                }
              })}
            
          </AccordionDetails>
        </Accordion>
      </div>

      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>

      {currentItems.map((que, index) => {
        let correctAns;
        //Logic to display correctAns
        if (que.option1[0].istrue) correctAns = que.option1[0].text;
        if (que.option2[0].istrue) correctAns = que.option1[0].text;
        if (que.option3[0].istrue) correctAns = que.option1[0].text;
        if (que.option4[0].istrue) correctAns = que.option1[0].text;

        return (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              padding: "10px",
              color: "black",
              width: "600px",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <div style={{ margin: "10px" }}>
              <input type="checkbox" />
            </div>
            <div>
              <p style={{ color: "black", fontWeight: "600" }}>
                {indexOfFirstItem + index + 1}. {que.question}
              </p>
              <p style={{ color: "black" }}>
                a). {que.option1[0].text} &nbsp; b). {que.option2[0].text}{" "}
                &nbsp; c). {que.option3[0].text} &nbsp; d).{" "}
                {que.option4[0].text} &nbsp;
              </p>
              <br />
              <p style={{ color: "green", fontWeight: "600" }}>
                {" "}
                Correct Answer: {correctAns}
              </p>
            </div>
          </div>
        );
      })}
      <div className="loadspace">
        <button className="loadmore" onClick={handleLoadMore}>
          Load More
        </button>

        <button className="loadless" onClick={handleLoadLess}>
          Load less
        </button>
      </div>
      <div>
        <ul className="pageNumbers">
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage === pages[0] ? true : false}
            >
              Prev
            </button>
          </li>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}

          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage === pages[pages.length - 1] ? true : false}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropdownComponent;
