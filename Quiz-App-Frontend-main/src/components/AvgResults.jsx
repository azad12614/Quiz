import React, { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";

export default function AvgResults({ changeQuestion, answer, change }) {
  const [result, setResult] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3001/question/${answer?.answer}/${answer?.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
    .then(res=> res.json())
    .then((data)=>{
        console.log(data)
        setResult(data)
        localStorage.setItem('result',JSON.stringify(data))
    })
  }, []);
  return (
    <div className="flex justify-center">
      <section className="mt-52 space-y-5 flex flex-col items-center">
        <p className="text-gray-300 text-4xl text-center mb-5"> {Math.ceil(result?.count)}%</p>
        <p className="text-center text-lg">{result?.result}</p>
        <button
          type="button"
          onClick={() => {
            changeQuestion();
            change(0);
          }}
          className="border border-cyan-800 hover:bg-cyan-800 text-cyan-800 hover:text-gray-300 px-5 py-2 rounded-full"
        >
          Answer Next
        </button>
      </section>
    </div>
  );
}
