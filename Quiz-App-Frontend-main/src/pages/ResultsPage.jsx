import React from "react";
import { Link } from "react-router-dom";

export default function ResultsPage() {
  const data = JSON.parse(localStorage.getItem("result"));
  const question = JSON.parse(localStorage.getItem("questions"));
  return (
    <div className="px-32 pt-28 grid grid-cols-6 gap-x-5 bg-black text-gray-500 h-screen">
      <section className="pt-12 col-span-2 flex flex-col items-center gap-y-7">
        <div className="text-center">
          <p>{data?.result}</p>
          <p className="text-lg text-gray-300">
            You are in the {data?.category} category
          </p>
          <p className="text-4xl text-gray-400 mt-20">
            {Math.ceil(data?.count)}%
          </p>
        </div>
        <Link
          to="/"
          state={{ from: 1 }}
          className="border border-cyan-700 hover:bg-cyan-700 hover:text-gray-300 px-5 py-1.5 rounded-full"
        >
          Play Again
        </Link>
      </section>
      <section className="col-span-4">
        <p className="border-b border-gray-500 pr-20 pb-2.5 mb-2.5 w-full">
          Questions that you have answered.
        </p>
        {question.map((i, index) => {
          if (i?.myAnswer)
            return (
              <p key={index} className="text-gray-400">
                <span>
                  {index + 1}. {i?.question}?
                </span>{" "}
                <span className="mx-2 text-gray-500 text-sm">Ans:</span>
                {i?.myAnswer}
              </p>
            );
          else return <></>;
        })}
      </section>
    </div>
  );
}
