import { useState } from "react";
import "./App.css";
import DropdownComponent from "./components/DropdownComponent";


function App() {

  const [data, setData] = useState({
    constestType: "",
    contestName: "",
    contestsubType: "",
    enddate: "2022-02-22T20:10:12+04:30",
    entryFee: "",
    img: "imageurl",
    sellType: "",
    sponsered: "",
    startdate: "2022-02-22T20:10:12+04:30",
    status: "Onapp",
    totalPlayers: "",
    totalquestion: "",
    totaltime: "",
    winningamount: ""
  });

  const [onbtn,setonbtn]=useState(false);

 

  const [tab, setTab] = useState("CREATE CONTEST");
  const switchtab = (e) => {
    setTab(e.target.innerText);
  }
  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    if(data.constestType!=="" && data.contestName!=="" && data.contestsubType!=="" && data.enddate!=="" && data.entryFee!=="" && data.img!=="" && data.sellType!=="" && data.sponsered!=="" && data.startdate!=="" && data.status!=="" && data.totalPlayers!=="" && data.totalquestion!=="" &&data.totaltime!=="" &&data.winningamount!=="" )
    {
      setonbtn(true);
      // setData({...data,img:""});
    }
    else
    {setonbtn(false);}
  }

  const createContest = async () => {
    console.log(data);

    const result = await fetch('http://cootz-backend-api.herokuapp.com/createcontestAdmin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const res = await result.json();
    console.log(res);
  }

  return (
    <div className="wrapper">
      <div className="wrapper_left">
        <ul>
          <li data-li="angular" name="angular" onClick={switchtab} className={tab === 'UPLOAD EXCEL' ? 'active' : ''} >
            <p>Upload Excel </p>
          </li>
          <li data-li="nodejs" onClick={switchtab} className={tab === 'CREATE CONTEST' ? 'active' : ''}>
            <p>Create contest</p>
          </li>
          <li data-li="reactjs" onClick={switchtab} className={tab === 'ADD QUESTION TO CONTEST' ? 'active' : ''}>
            <p>Add Question to contest</p>
          </li>
          <li data-li="vuejs" onClick={switchtab} className={tab === 'VIEW QUESTION' ? 'active' : ''}>
            <p>View question</p>
          </li>
        </ul>
      </div>
      <div className="wrapper_right">
        <div className="container">
          <div className='item angular' style={tab === 'UPLOAD EXCEL' ? { display: 'block' } : { display: 'none' }}>
            <div className="item_info">
              <div className="img"></div>
              <p>Please be sure of the excel form-data</p>
            </div>
            <form
              id="uploadForm"
              encType="multipart/form-data"
              action="/readxl"
              method="post"
            >
              <input type="file" name="userPhoto" />
              <input type="submit" value="submit" name="submit" />
            </form>
          </div>
          <div className="item nodejs" style={tab === 'CREATE CONTEST' ? { display: 'block' } : { display: 'none' }}>
            <div className="item_info" style={{ color: 'white', fontWeight: '500' }}>
              {/* <!-- <div className="img"></div> --> */}
              <div className="form_container">
                {/* <form  className="form"> */}
                <label htmlFor="contest_type">CONTEST TYPE  </label> : &nbsp;&nbsp;
                <input type='radio' id="Exam" name="constestType" onClick={(e) => { console.log(e.target.id);
                setData({ ...data, [e.target.name]: e.target.id })
                }} /> <label className="noStar" htmlFor="Exam" style={{fontSize:'18px'}}>&nbsp; Exam</label>

                <input type='radio' id="Trivia" name="constestType" onClick={(e) => { console.log(e.target.id);
                setData({ ...data, [e.target.name]: e.target.id })
                }} /> <label className="noStar" htmlFor="Trivia" style={{fontSize:'18px'}}>&nbsp; Trivia</label> <br /><br/>

                <label htmlFor="contest_name">CONTEST NAME</label><br />
                <input type="text" id="contest_name" name="contestName" placeholder="EG : Live Contest-sell Test" onChange={onchange} required />

                <label htmlFor="contest_subtype">CONTEST SUBTYPE</label><br />
                <input type="text" id="contest_subtype" name="contestsubType" placeholder="EG : UPSC" onChange={onchange} required />

                <label htmlFor="end_date">END DATE</label><br />
                <input type="date" id="end_date" name="endDate" onChange={onchange} />

                <label htmlFor="entry_fees">ENTRY FEES</label>
                <input type="number" id="entry_fees" name="entryFee" placeholder="Rs 1" onChange={onchange} />

                <label htmlFor="sellType">SELL TYPE</label>
                <input type='text' id="sellType" name="sellType" placeholder="Ex. True" onChange={onchange} />

                <label htmlFor="sponsered">SPONSERED</label>: &nbsp;&nbsp;
                <input type='radio' id="Yes" name="sponsered" onClick={(e) => { console.log(e.target.id);
                setData({ ...data, [e.target.name]: e.target.id })
                }} /> <label className="noStar" htmlFor="Exam" style={{fontSize:'18px'}}>&nbsp; YES</label>

                <input type='radio' id="No" name="sponsered" onClick={(e) => { console.log(e.target.id);
                setData({ ...data, [e.target.name]: e.target.id })
                }} /> <label className="noStar" htmlFor="Trivia" style={{fontSize:'18px'}}>&nbsp; NO</label> <br /><br/>

                <label htmlFor="start_date">START DATE</label><br />
                <input type="date" id="start_date" name="startDate" onChange={onchange} />

                <label htmlFor="total_Players">TOTAL PLAYERS</label>
                <input type="number" id="total_Players" name="totalPlayers" placeholder="10" onChange={onchange} />

                <label htmlFor="totalquestion">TOTAL QUESTIONS</label><br />
                <input type="number" id="totalquestion" name="totalquestion" placeholder="5" onChange={onchange} required />

                <label htmlFor="total_time">TOTAL TIME</label>
                <input type="time" id="total_time" name="totaltime" onChange={onchange} />

                <label htmlFor="winning_amount">WINNING AMOUNT</label><br />
                <input type="number" id="winning_amount" name="winningamount" placeholder="Rs 100" onChange={onchange} />
                {/* 
                <label htmlFor="start_time">START TIME</label>
                <input type="time" id="start_time" name="startTime"  onChange={onchange} />


                <label htmlFor="end_time">END TIME</label>
                <input type="time" id="end_time" name="endTime"  onChange={onchange} /> */}


                {/* <label htmlFor="status">STATUS</label>
                <input type="text" id="status" name="status" placeholder="Onapp" onChange={onchange} /> */}

                {/* <label htmlFor="image">UPLOAD IMAGE OF CONTEST </label><br />
                <input type="file" name="img"  onChange={onchange} /> */}

                <div style={{ 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', }}>
                  <button className={onbtn?'btn btn-success ':'btn btn-success disabled'} onClick={createContest} style={{'fontWeight': 'bold' }}>Create Contest</button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
          <div className="item reactjs" style={tab === 'ADD QUESTION TO CONTEST' ? { display: 'block' } : { display: 'none' }}>

            <DropdownComponent />

          </div>
          <div className="item vuejs" style={tab === 'VIEW QUESTION' ? { display: 'block' } : { display: 'none' }}>
            <div className="item_info">
              <div className="img"></div>
              <p>vue.js</p>
            </div>
            <p>
              Vue is a progressive framework for building user interfaces.
              Unlike other monolithic frameworks, Vue is designed from the
              ground up to be incrementally adoptable. The core library is
              focused on the view layer only, and is easy to pick up and
              integrate with other libraries or existing projects. On the other
              hand, Vue is also perfectly capable of powering sophisticated
              Single-Page Applications when used in combination with modern
              tooling and supporting libraries.
            </p>
            <p>
              If you’d like to learn more about Vue before diving in, we created
              a video walking through the core principles and a sample project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
