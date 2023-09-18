import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GetQuestionsByUser, PostQuestions } from "../../utils/Const";
import { NotificationManager } from "react-notifications";
import { setQuistions } from "../../Redux/Actions";

function AddQuestion() {
    const Basic =  useSelector(state=>state.handleUserBasicData);
    const MasterData =  useSelector(state=>state.handleMasterData);
    const navigate = useNavigate();
    const Dispatch =  useDispatch();

    const [question, setQuestion] = useState("");
    const [category, setCategory] = useState("64f6f56bb7c531607f77a2b7");
    const [cate, setCateData] = useState([]);

    useLayoutEffect(()=>{
        if (MasterData.categroies != null) {
            let temp = [];
            for (let i = 0; i < MasterData.categroies.length; i++) {
              const element = MasterData.categroies[i];
              if (element.cateType == "Questions") {
                temp.push(element);
              }
            }
            setCateData(temp);
          }
    },[MasterData])

    const handleBack = () => {
        navigate("/patient/questions");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let data ={
            uid: Basic.uid,
            question: question,
            cateId:category,
            isAnsweringEnabled:true,
            status:0,
        }
        PostQuestions(data).then(d=>{
            if(d!=null){
                NotificationManager.success("Question added.")
                let data ={
                    uid:Basic.uid
                }
                GetQuestionsByUser(data).then(d=>{
                    if(d!=null){
                        Dispatch(setQuistions(d.data));
                        navigate(-1)
                    }
                })
            }
        })
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
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


                                        <div className="pt-6 border-gray-300 mt-2 px-2">
                                            <p className="text-base font-semibold leading-4 text-gray-800">
                                                Question
                                            </p>
                                            <div className="mt-10 border border-gray-300 rounded">
                                                <textarea
                                                    className="resize-none w-full h-[100px] px-4 py-4 text-base outline-none text-slate-600"
                                                    placeholder="Start typing here ..."
                                                    value={question}
                                                    onChange={(e) => setQuestion(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mt-5 text-base font-medium leading-none text-gray-800">
                                                Category
                                            </p>
                                            <select
                                                className="w-full p-4 mt-4 mx-1 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                value={category}
                                                onChange={handleCategoryChange}
                                            >
                                                <option selected disabled value="">Select category</option>
                                                {
                                                    cate.map((data,index)=>{
                                                        return  <option key={index} value={data._id}>{data.name}</option>
                                                    })
                                                }
                                            </select>
                                            <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Select a category for your Question
                                            </p>
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
                                                Create
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

export default AddQuestion;


