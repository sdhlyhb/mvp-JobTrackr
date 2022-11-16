import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import TimerTwoToneIcon from "@mui/icons-material/TimerTwoTone";

function InterviewEntry(props) {
  const interviewDate = new Date(props.interview.interview_date);
  const today = new Date();
  const calDays = Math.ceil((interviewDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div>
      <TimerTwoToneIcon n />
      {props.interview.job_title} @ {props.interview.company_name}{" "}
      <span>
        {" "}
        interview on {new Date(props.interview.interview_date).toLocaleString()}
      </span>{" "}
      <span className="time-stamp">(in {calDays} days)</span>
      <button
        id={`${props.interview._id}-offerBtn`}
        onClick={props.clickOfferBtn}
      >
        <FontAwesomeIcon icon={faFaceLaugh} />
        OFFER
      </button>
      <button
        id={`${props.interview._id}-itw-rejBtn`}
        onClick={props.clickRejBtn}
      >
        <FontAwesomeIcon icon={faHeartBroken} />
        Rej
      </button>
      {"    "}
    </div>
  );
}

export default InterviewEntry;
