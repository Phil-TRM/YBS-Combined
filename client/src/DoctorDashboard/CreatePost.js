import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FILE_HEADER,
  GET_POST_BY_USER_ID,
  JSON_HEADER,
  POST_HANDLER,
  PostCreated,
  UserHandler,
} from "../utils/Const";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserPosts } from "../Redux/Actions";
import TextEditor from "../Components/Text";
import { useLayoutEffect } from "react";

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [desc, setDesc] = useState("");
  const basicData = useSelector((state) => state.handleUserBasicData);
  const masterData = useSelector((state) => state.handleMasterData);
  const [categories, setCategories] = useState(masterData.categroies);
  const Dispatch = useDispatch();

  useLayoutEffect(() => { });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSlugChange = (e) => {
    setSlug(e.target.value);
  };

  const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImage2Change = (e) => {
    setImage2(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
    for (let i = 0; i < categories.length; i++) {
      const element = categories[i];
      if (element.name == e.target.value) {
        setCategory(element._id);
      }
    }
  };
  const handleDescriptionChange = (e) => {
    setDesc(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", title);
    fd.append("categoriesId", category);
    fd.append("image1", image1);
    fd.append("image2", image2);
    fd.append("description", desc);
    fd.append("postedByID", basicData.uid);
    fd.append("status", 0);
    fd.append("slug", slug);

    fetch(POST_HANDLER, {
      method: "POST",
      headers: FILE_HEADER,
      body: fd,
    }).then((res) => {
      if (res.ok) {
        fetch(PostCreated, {
          method: "POST",
          headers: JSON_HEADER,
          body: JSON.stringify({ _id: basicData.uid })
        }).then(d => {
          fetch(UserHandler, {
            method: "POST",
            headers: JSON_HEADER,
            body: JSON.stringify({ _id: basicData.uid })
          }).then(d => {
            if (d.ok) {
              d.json().then(d => {
                Dispatch(setUserData(d.data))
              })
            }
          })
        })
        fetch(GET_POST_BY_USER_ID, {
          method: "POST",
          headers: JSON_HEADER,
          body: JSON.stringify({ uid: basicData.uid }),
        }).then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              let d = data.data;
              Dispatch(setUserPosts(d));
              navigate("/doctor/posts");
            });
          }
        });
      }
    });
  };

  return (
    <>
      <div className="px-0 py-0 ">
        <div className="flex flex-no-wrap items-start">
          <div className="w-full ">
            <div className="py-4 px-2">
              <div className="bg-white rounded shadow mt-7 py-7">
                <form onSubmit={handleFormSubmit}>
                  <div className="mt-10 px-7">
                    <p className="text-xl font-semibold leading-tight text-gray-800">
                      Create New Post
                    </p>

                    <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
                      <div>
                        <p className="text-base font-medium leading-none text-gray-800">
                          Title
                        </p>
                        <input
                          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                          value={title}
                          required
                          onChange={handleTitleChange}
                        />
                        <p className="mt-3 text-xs leading-3 text-gray-600">
                          Set a simple and precise title
                        </p>
                      </div>
                      <div>
                        <p className="text-base font-medium leading-none text-gray-800">
                          Slug
                        </p>
                        <input
                          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                          value={slug}
                          required
                          onChange={handleSlugChange}
                        />
                        <p className="mt-3 text-xs leading-[15px] text-gray-600">
                          Set Slug and remember slug must be unique 
                        </p>
                      </div>
                      <div>
                        <p className="text-base font-medium leading-none text-gray-800">
                          Category
                        </p>
                        <select
                          className="w-full p-4 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                          value={categoryName}
                          required
                          onChange={handleCategoryChange}
                        >
                          <option value="">Select category</option>
                          {categories.map((item, index) => {
                            return (
                              <option key={index} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                        <p className="mt-3 text-xs leading-[15px] text-gray-600">
                          Select a category for your post
                        </p>
                      </div>
                      <div>
                        <p className="text-base font-medium leading-none text-gray-800">
                          Image1
                        </p>
                        <input
                          accept="image/*"
                          type="file"
                          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                          onChange={handleImage1Change}
                        />
                        <p className="mt-3 text-xs leading-[15px] text-gray-600">
                          Set the main image for the Post with a 1:1 Ratio
                        </p>
                      </div>
                      <div>
                        <p className="text-base font-medium leading-none text-gray-800">
                          Image2
                        </p>
                        <input
                          accept="image/*"
                          type="file"
                          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                          onChange={handleImage2Change}
                        />
                        <p className="mt-3 text-xs leading-[15px] text-gray-600">
                          Set a high-quality image for your post
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-gray-300 mt-2 px-7">
                    <p className="text-base font-semibold leading-4 text-gray-800">
                      Description
                    </p>
                    <TextEditor placeholder={"Description"} setDesc={(d) => { setDesc(d); console.log(d); }} />
                  </div>
                  <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                    Enter product meta description for better understanding
                  </p>
                  <hr className="h-[1px] bg-gray-100 my-14" />
                  <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                    <button
                      onClick={() => navigate("/doctor/posts")}
                      className="bg-white border-[#452a72] rounded hover:bg-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-[#452a72] hover:text-white border lg:max-w-[95px]  w-full "
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      // onClick={handleFormSubmit}
                      className="bg-[#452a72] rounded hover:bg-transparent border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white hover:text-[#452a72] lg:max-w-[144px] w-full  "
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
    </>
  );
}

export default CreatePost;
