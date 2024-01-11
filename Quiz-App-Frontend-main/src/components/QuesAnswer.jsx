import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { BsUpload } from "react-icons/bs";

export default function QuesAnswer({
  changeQuestion,
  ques,
  change,
  getAnswer,
  answer,
}) {
  const addAnswerToQuestion = () => {
    let questions = JSON.parse(localStorage.getItem("questions"));
    questions = questions.map((q) => {
      if (q?._id == ques?._id) {
        // let ans = q.myAnswer.push(answer.answer)
        return {
          ...q,
          myAnswer: answer?.answer,
        }
      } else return q
    });
    localStorage.setItem('questions', JSON.stringify(questions))
    console.log("NEW ", answer?.answer, questions)
  };
  const uploadAnswer = () => {
    addAnswerToQuestion()
    fetch(`http://localhost:3001/question/${ques?._id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: answer?.answer,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        // navigate("/", { replace: true });
        // setCookie("questions");
        console.log(answer);
      });
  };



  return (
    <div className="flex justify-center">
      <section className="mt-52 space-y-3.5 flex flex-col items-center">
        <p className="text-center text-sm">Answer the Question</p>
        <p className="text-gray-300 text-xl text-center"> {ques?.question}</p>
        <form className="w-[35rem] flex flex-col justify-center items-center gap-5">
          <input
            onChange={(e) => {
              getAnswer({
                id: ques?._id,
                answer: e.target.value,
              });
            }}
            className="px-3.5 py-2 w-96 mt-12 bg-transparent text-gray-400 border-b border-gray-400 placeholder:text-gray-500"
            type="text"
            value = {answer?.answer}
            placeholder="Type your answer"
            name=""
            id=""
          />
          <p>Or</p>

          <input
            className="w-full"
            type="range"
            min="0"
            max="1000000"
            value={answer?.answer}
            onChange={({ target: { value: radius } }) => {
              getAnswer({
                id: ques?._id,
                answer: radius,
              });
            }}
          />
          <div className="flex justify-center w-full">
            {/* <div className="buble">{answer?.answer}</div>  */}
            {answer?.answer ? (
              <button
                type="button"
                onClick={() => {
                  // changeQuestion()
                  change(1);
                  uploadAnswer();
                }}
                className="text-2xl text-cyan-800 hover:text-cyan-600"
              >
                <BsUpload />
              </button>
            ) : (
              <button
                type="button"
                className="text-2xl text-cyan-800 cursor-not-allowed"
              >
                <BsUpload />
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}