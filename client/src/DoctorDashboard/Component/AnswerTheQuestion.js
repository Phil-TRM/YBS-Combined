import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { GetQuestions, GetQuestionsById, PostAnswers } from "../../utils/Const";
import { useSearchParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { setQuistions } from "../../Redux/Actions";

function AnswerTheQuestion() {
  const navigate = useNavigate();
  const Quations = useSelector(state=>state.QandA);
  const Basic = useSelector(state=>state.handleUserBasicData);
  const Dispatch =  useDispatch();
  const {id} =  useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  useLayoutEffect(() => { 
    if(Quations.length>0){
      for (let i = 0; i < Quations.length; i++) {
        const element = Quations[i];
        if(element._id==id){
          setQuestion(element.question)
        }
      }
    }else{
      GetQuestionsById({_id:id}).then(d=>{
        if(d!=null){
          setQuestion(d.data.question)
        }
      })
    }
  },[Quations]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data =  {
      qid: id,
      uid: Basic.uid,
      answer: answer,
      status: 1,
    }
    PostAnswers(data).then(d=>{
      if(d!=null){
        NotificationManager.success("Answered Successfully")
        GetQuestions().then(data=>{
          if(data!=null){
            Dispatch(setQuistions(data.data))
            navigate(-1)
          }
        })
      }
     
    })
  };


  return (
    <>
      <div className="px-0 py-0 ">
        <div className="flex flex-no-wrap items-start">
          <div className="w-full ">
            <div className="py-4 px-2">
              <div className="bg-white rounded shadow py-7">
                <div className="mt-10 px-7">

                  <form onSubmit={handleSubmit}>

                    <div>
                      <p className="px-1 text-base font-medium leading-none text-gray-800">
                        Q. {question}
                      </p>
                  
                    </div>
                    <div className="pt-6 border-gray-300 mt-2 px-2">
                      <p className="text-base font-semibold leading-4 text-gray-800">
                        Ans.
                      </p>
                      <div className="mt-5 border border-gray-300 rounded">
                        <textarea
                          className="resize-none w-full h-[100px] px-4 py-4 text-base outline-none text-slate-600"
                          placeholder="Start typing here ..."
                          value={answer}
                          required
                          onChange={(e) => setAnswer(e.target.value)}
                        />
                      </div>
                    </div>



                    <hr className="h-[1px] bg-gray-100 my-14" />
                    <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                      <button
                        onClick={handleBack}
                        className="bg-white border-[#452a72] rounded hover:bg-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-[#452a72] hover:text-white border lg:max-w-[95px]  w-full "
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-[#452a72] rounded hover:bg-transparent border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white hover:text-[#452a72] lg:max-w-[144px] w-full "
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}




export default AnswerTheQuestion