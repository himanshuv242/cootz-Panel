import { useState } from 'react';
import './App.css';

function App() {

  var li_elements = document.querySelectorAll(".wrapper_left ul li");
  var item_elements = document.querySelectorAll(".item");
  for (var i = 0; i < li_elements.length; i++) {
    li_elements[i].addEventListener("click", function () {
      li_elements.forEach(function (li) {
        li.classList.remove("active");
      });
      this.classList.add("active");
      var li_value = this.getAttribute("data-li");
      item_elements.forEach(function (item) {
        item.style.display = "none";
      });
      if (li_value === "angular") {
        document.querySelector("." + li_value).style.display = "block";
      } else if (li_value === "nodejs") {
        document.querySelector("." + li_value).style.display = "block";
      } else if (li_value === "reactjs") {
        document.querySelector("." + li_value).style.display = "block";
      } else if (li_value === "vuejs") {
        document.querySelector("." + li_value).style.display = "block";
      } else {
        console.log("");
      }
    });
  }

  const [activeLi,setActiveLi]=useState("")
  const liValue=(e)=>{
    setActiveLi(e.target.textContent)
    // console.log(activeLi);
  }

  return (
    <div className="wrapper">
      <div className="wrapper_left">
        <ul>
          <li data-li="angular" name="angular" onClick={liValue}>
            <p>Upload Excel </p>
          </li>
          <li data-li="nodejs" className="active" onClick={liValue}>
            <p>Create contest</p>
          </li>
          <li data-li="reactjs" onClick={liValue} >
            <p>Add Question to contest</p>
          </li>
          <li data-li="vuejs" onClick={liValue}>
            <p>View question</p>
          </li>
        </ul>
      </div>
      <div className="wrapper_right">
        <div className="container">
          <div className="item angular">
            <div className="item_info">
              <div className="img"></div>
              <p>Please be sure of the excel form-data</p>
            </div>
            <form id="uploadForm" encType="multipart/form-data" action="/readxl" method="post">
              <input type="file" name="userPhoto" />
              <input type="submit" value="submit" name="submit" />
            </form>

          </div>
          <div className="item nodejs" style={{'marginTop':'850px'}}>
            <div className="item_info">
              {/* <!-- <div className="img"></div> --> */}
              <div className="form_container">
                <form action="/public/js/connetToBackend.js" method="post" className="form">
                  <label htmlFor="contest_name">CONTEST NAME</label><br />
                  <input type="text" id="contest_name" name="contest_name" placeholder="EG : UPSC" />

                  <label htmlFor="contest_fees">CONTEST FEES</label>
                  <input type="number" id="contest_fees" name="contest_fees" placeholder="Rs 100" />

                  <label htmlFor="pool_size">POOL SIZE</label><br />
                  <input type="number" id="pool_size" name="pool_size" placeholder="100" />

                  <label htmlFor="winning_amount">WINNING AMOUNT</label><br />
                  <input type="number" id="winning_amount" name="winning_amount" placeholder="Rs 10000" />

                  <label htmlFor="subject">SUBJECT</label><br />
                  <input type="text" id="subject" name="subject" placeholder="MATHS" />

                  <label htmlFor="start_date">START DATE</label><br />
                  <input type="date" id="start_date" name="start_date" />
                  <input type="time" id="start_date" name="start_date" />

                  <label htmlFor="end_date">END DATE</label><br />
                  <input type="date" id="end_date" name="end_date" />

                  <label htmlFor="start_time">START TIME</label>
                  <input type="time" id="start_time" name="start_time" />

                  <label htmlFor="end_time">END TIME</label>
                  <input type="time" id="end_time" name="end_time" />

                  <label htmlFor="contest_duration">DURATION OF CONTEST ( in mins )</label>
                  <input type="time" id="contest_duration" name="contest_duration" />
                  <label htmlFor="sections">NO OF SECTIONS</label><br />
                  <input type="number" id="sections" name="sections" placeholder="2" />

                  <label htmlFor="questions">NO OF QUESTIONS ( IN EACH SECTION )</label><br />
                  <input type="number" id="questions" name="questions" placeholder="20" />
                  
                  <label htmlFor="contest_image">UPLOAD IMAGE OF CONTEST</label><br />
                  <input type="file" name="userPhoto" />

                  <input type="submit" value="CREATE" />
                </form>
              </div>
            </div>

          </div>
          <div className="item reactjs" style={{'display': 'none'}}>
            <div className="item_info">
              <div className="img"></div>

            </div>

          </div>
          <div className="item vuejs" style={{'display': 'none'}}>
            <div className="item_info">
              <div className="img"></div>
              <p>vue.js</p>
            </div>
            <p>Vue is a progressive framework for building user interfaces. Unlike other monolithic
              frameworks, Vue
              is designed from the ground up to be incrementally adoptable. The core library is focused on
              the
              view layer only, and is easy to pick up and integrate
              with other libraries or existing projects. On the other hand, Vue is also perfectly capable
              of
              powering sophisticated Single-Page Applications when used in combination with modern tooling
              and
              supporting libraries.</p>
            <p>If you’d like to learn more about Vue before diving in, we created a video walking through
              the core
              principles and a sample project.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
