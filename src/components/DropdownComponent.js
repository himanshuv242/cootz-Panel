import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

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
  let queno=0;

  const fetchQuestions = () => {
    fetch("http://cootz-backend-api.herokuapp.com/getques")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      });
  };

  // console.log("Showing questions");
  console.log(questions);

  useEffect(() => {
    fetchData();
    fetchQuestions();
  }, []);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{fontSize:'12px',fontWeight:'600'}}>
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
          
      {/* <div className="container my-4">
      <Table striped bordered hover variant="dark">
                <tbody>
                  <tr>
                    <td>Select</td>
                    <td>Id</td>
                    <td>Questions</td>
                  </tr>
                </tbody>
              </Table>
      </div> */}


      {item.map((bata) => {
        if (bata._id === individual) {
          return (
            <div
              className="container my-4"
              style={{ height: 600, overflow: "scroll" }}
            >
              <Table striped bordered hover variant="dark">
                <tbody>
                  <tr>
                    <td><input
                type={"checkbox"}
              /></td>
                    <td>Id</td>
                    <td>{bata._id}</td>
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

      {questions.map((que)=>{
        if(queno<=10){
          queno++;
          let correctAns;
          if(que.option1[0].istrue)
          correctAns=que.option1[0].text;
          if(que.option2[0].istrue)
          correctAns=que.option1[0].text;
          if(que.option3[0].istrue)
          correctAns=que.option1[0].text;
          if(que.option4[0].istrue)
          correctAns=que.option1[0].text;

        return(
          <div style={{backgroundColor:'white',padding:'10px',color:'black',width:'600px',display:'flex',alignItems:'flex-start'}}>
            <div style={{margin:'10px'}}>
              <input type='checkbox' />
            </div>
            <div>
            <p style={{color:'black',fontWeight:'600'}}>{queno}. {que.question}</p>
            <p style={{color:'black'}}>a). {que.option1[0].text} &nbsp; b). {que.option2[0].text} &nbsp; c). {que.option3[0].text} &nbsp; d). {que.option4[0].text} &nbsp;</p><br/>
            <p style={{color:'green',fontWeight:'600'}}> Correct Answer: {correctAns}</p>
            </div>
          </div>
        )
        }
      })}
    </>
  );
};

export default DropdownComponent;
