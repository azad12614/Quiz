import { useEffect, useState } from "react";
import { HiUserCircle } from "react-icons/hi2";
import { IoMdReturnRight } from "react-icons/io";
import QuesAnswer from "../components/QuesAnswer";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import AvgResults from "../components/AvgResults";
function HomePage() {
  // const location = useLocation();
  // const { from } = location.state;
  let questions = useLoaderData();
  questions = questions?.map((q) => {
    return {
      ...q,
      myAnswer: null,
    };
  });

  // const [cookies, setCookie] = useCookies(['questions', 'answers']);
  useEffect(() => {
    const question = JSON.stringify(questions);
    localStorage.setItem("questions", question);
  }, []);
  // questions = questions.map((i)=>{
  //   if(i.myAnswer)
  //   return i
  // })
  const [answer, setAnswer] = useState({
    id: null,
    answer: 0,
    count: null,
  });
  console.log(questions);
  const [change, setChange] = useState(0);
  const [ques, setQues] = useState(0);
  // if (from) setQues(ques + 1);
  const changeQuestion = () => {
    if (ques + 1 == questions?.length) setQues(0);
    else if (ques + 1 < questions?.length) setQues(ques + 1);
    setAnswer({
      ...answer,
      answer: 0,
    });
  };
  return (
    <div className="bg-black text-gray-500 h-screen">
      {change ? (
        <AvgResults
          changeQuestion={changeQuestion}
          ques={questions && questions[ques]}
          change={setChange}
          answer={answer}
        />
      ) : (
        <QuesAnswer
          changeQuestion={changeQuestion}
          ques={questions && questions[ques]}
          change={setChange}
          answer={answer}
          getAnswer={setAnswer}
          // setCookie={setCookie}
          // cookie={cookies}
        />
      )}
      <div>
        <button
          onClick={() => changeQuestion()}
          className="flex justify-center items-center gap-x-2 font-mono absolute bottom-28 right-32"
        >
          <IoMdReturnRight /> Next
        </button>
        {/* <button className="font-mono absolute top-28 right-32">Category</button> */}
        <Link
          to="./result"
          className="flex justify-center items-center gap-x-2 font-mono absolute top-28 left-32"
        >
          <span className="text-2xl">
            <HiUserCircle />
          </span>
          Results
        </Link>
      </div>
    </div>
  );
}

export default HomePage;