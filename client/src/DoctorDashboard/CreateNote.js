import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";

import TextEditor from "../Pages/Text";
import { Textarea } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { GetNotesByUser, PostNotes } from "../utils/Const";
import { NotificationManager } from "react-notifications";
import { setNotes } from "../Redux/Actions";

function CreateNote() {
  const MasterData = useSelector((state) => state.handleMasterData);
  const Basic = useSelector((state) => state.handleUserBasicData);
  const Dispatch =useDispatch();
  const navigate = useNavigate();
  const [cate, setCateData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState(null);
  const [category, setCategory] = useState("");

  useLayoutEffect(() => {
    if (MasterData.categroies != null) {
      let temp = [];
      for (let i = 0; i < MasterData.categroies.length; i++) {
        const element = MasterData.categroies[i];
        if (element.cateType == "Notes") {
          temp.push(element);
        }
      }
      setCateData(temp);
    }
  }, [MasterData]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const fromData = new FormData();

    fromData.append("uid", Basic.uid);
    fromData.append("title", title);
    fromData.append("para", description);
    fromData.append("cateId", category);
    fromData.append("imgUrl", image1);
    fromData.append("status", 0);

    PostNotes(fromData).then(d=>{
        if(d!=null){
            NotificationManager.success("Note Created.")
            let data= {
                uid:Basic.uid
            }
            GetNotesByUser(data).then(d=>{
                if(d!=null){
                    Dispatch(setNotes(d.data));
                }
            })
            navigate(-1)
        }
    })
  };

  return (
    <>
      <div className="px-0 py-0 ">
        <div className="flex flex-no-wrap items-start">
          <div className="w-full ">
            <div className="py-4 px-2">
              <div className="bg-white rounded shadow mt-7 py-7">
                <div className="mt-10 px-7">
                  <p className="text-xl font-semibold leading-tight text-gray-800">
                    Create New Note
                  </p>
                  <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
                    <div>
                      <p className="text-base font-medium leading-none text-gray-800">
                        Title
                      </p>
                      <input
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                        value={title}
                        onChange={handleTitleChange}
                      />
                      <p className="mt-3 text-xs leading-3 text-gray-600">
                        Set a simple and precise title
                      </p>
                    </div>

                    <div>
                      <p className="text-base font-medium leading-none text-gray-800">
                        Category
                      </p>
                      <select
                        className="w-full p-4 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                        value={category}
                        onChange={handleCategoryChange}
                      >
                        <option selected disabled value="">
                          Select category
                        </option>
                        {cate.map((data, index) => {
                          return (
                            <option key={index} value={data._id}>
                              {data.name}
                            </option>
                          );
                        })}
                      </select>
                      <p className="mt-3 text-xs leading-[15px] text-gray-600">
                        Select a category for your Note
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-medium leading-none text-gray-800">
                        Image
                      </p>
                      <input
                        accept="image/*"
                        type="file"
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                        onChange={handleImage1Change}
                      />
                      <p className="mt-3 text-xs leading-[15px] text-gray-600">
                        Set the image for your Note
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-gray-300 mt-2 px-7">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Description
                  </p>

                  <div className="mt-10 ">
                    <div className="relative flex flex-wrap items-center px-0 py-0 ">
                      <div className="w-full">
                        <Textarea
                          style={{ outline: "none" }}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                  Enter description for better understanding
                </p>
                <hr className="h-[1px] bg-gray-100 my-14" />
                <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                  <button
                    onClick={() => navigate("/doctor/quickNotes")}
                    className="bg-white border-[#452a72] rounded hover:bg-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-[#452a72] hover:text-white border lg:max-w-[95px]  w-full "
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFormSubmit}
                    className="bg-[#452a72] rounded hover:bg-transparent border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white hover:text-[#452a72] lg:max-w-[144px] w-full  "
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNote;
