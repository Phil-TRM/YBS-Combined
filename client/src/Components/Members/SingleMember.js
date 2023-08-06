import React, { useLayoutEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { JSON_HEADER, UserHandler, FILE_URL } from "../../utils/Const";
import { LazyLoadImage } from "react-lazy-load-image-component";
import moment from "moment";

const SingleMember = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const MasterData = useSelector((state) => state.handleMasterData);
  const [data, setData] = useState("");
  const [userData, setUserData] = useState("");

  const [linkden, setLinkdenUrl] = useState("");
  const [mail, setMail] = useState("");
  const [facebook, setfacebook] = useState("");
  const [instagram, setinstagram] = useState("");
  const [twiter, settwiter] = useState("");
  const [discord, setdiscord] = useState("");
  const [reddit, setreddit] = useState("");
  const [thread, setThreads] = useState("");
  const [socialKeys, setSocialKeys] = useState(new Array());

  useLayoutEffect(() => {
    if (MasterData.posts != null) {
      let arr = [];
      for (let i = 0; i < MasterData.posts.length; i++) {
        const element = MasterData.posts[i];
        if (element.postedByID == id) {
          arr.push(element);
        }
      }
      setData(arr);
    }
  }, [MasterData]);
  useLayoutEffect(() => {
    getProfile();
  }, []);
  const formatDate = (string) => {
    return moment(string).format("DD MMM, YYYY");
  };
  const getProfile = () => {
    fetch(UserHandler, {
      method: "POST",
      headers: JSON_HEADER,
      body: JSON.stringify({
        _id: id,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((d) => {
          let UserData = d.data;
          setUserData(d.data);
          if (UserData.socialMedia != null) {
            setSocialKeys(Object.keys(UserData.socialMedia));
            setMail(UserData.socialMedia.mail);
            setLinkdenUrl(UserData.socialMedia.linkden);
            setfacebook(UserData.socialMedia.facebook);
            setinstagram(UserData.socialMedia.instagram);
            settwiter(UserData.socialMedia.twiter);
            setdiscord(UserData.socialMedia.discord);
            setreddit(UserData.socialMedia.reddit);
            setThreads(UserData.socialMedia.threds);
          }
        });
      }
    });
  };

  return (
    <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-20 w-20 overflow-hidden rounded-full">
          <LazyLoadImage
            alt="profile"
            loading="lazy"
            decoding="async"
           
            className="object-cover"
            sizes="(max-width: 320px) 100vw, 320px"
            src={FILE_URL + userData.dp} // Use the first data object's imageUrl
          />
        </div>
        <h1 className="text-brand-primary mt-2 text-3xl font-semibold tracking-tight dark:text-white lg:text-3xl lg:leading-tight">
          {userData.name}
        </h1>
        <div className="mx-auto mt-2 flex max-w-xl flex-col px-5 text-center text-gray-500">
          <p>{userData.aboutUser}</p>
        </div>
        <div className="mx-auto mt-2 flex max-w-xl flex-col px-5 text-center text-gray-500">
          <a target="_blank" href={userData.onlineClink} className=" hover:text-blue-500">Online consultation</a>
        </div>
        <div
          className="flex justify-end pt-5 gap-4 socials"
          style={{ display: userData.socialMedia ? "flex" : "none" }}
        >
          <div
            className="relative overflow-hidden block footer-div cursor-pointer"
            style={{
              display: socialKeys.includes("linkden") ? "flex" : "none",
            }}
          >
            <span className="block">
              <a target="_blank" href={linkden}>
                <FaLinkedinIn className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
              </a>
            </span>
          </div>
          <div
            className="relative overflow-hidden block footer-div cursor-pointer"
            style={{
              display: socialKeys.includes("mail") ? "flex" : "none",
            }}
          >
            <span className="block">
              <a target="_blank" href={`mailto:${mail}`}>
                <i className="social-links fa-solid fa-envelope text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
              </a>
            </span>
          </div>
          <div
            className=" relative overflow-hidden block footer-div cursor-pointer"
            style={{
              display: socialKeys.includes("facebook") ? "flex" : "none",
            }}
          >
            <span className="block">
              <a target="_blank" href={facebook}>
                <i className=" social-links fa-brands fa-facebook text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
              </a>
            </span>
          </div>
          <div
            className="relative overflow-hidden block footer-div cursor-pointer"
            style={{
              display: socialKeys.includes("instagram") ? "flex" : "none",
            }}
          >
            <span className="block">
              <a target="_blank" href={instagram}>
                <i className="social-links fa-brands fa-instagram text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
              </a>
            </span>
          </div>
          <div
            className="relative overflow-hidden block footer-div cursor-pointer"
            style={{
              display: socialKeys.includes("discord") ? "flex" : "none",
            }}
          >
            <span className="block">
              <a target="_blank" href={discord}>
                <i className="social-links fa-brands fa-discord text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
              </a>
            </span>
          </div>
          <div
            className="relative overflow-hidden block footer-div cursor-pointer"
            style={{
              display: socialKeys.includes("reddit") ? "flex" : "none",
            }}
          >
            <span className="block">
              <a target="_blank" href={reddit}>
                <i className="social-links fa-brands fa-reddit text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
              </a>
            </span>
          </div>
          <div
            className="relative overflow-hidden block footer-div cursor-pointer"
            style={{
              display: socialKeys.includes("twiter") ? "flex" : "none",
            }}
          >
            <span className="block">
              <a target="_blank" href={twiter}>
                <FiTwitter className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
              </a>
            </span>
          </div>
          <div
            className="relative overflow-hidden block footer-div cursor-pointer"
            style={{
              display: socialKeys.includes("threds") ? "flex" : "none",
            }}
          >
            <span className="block">
              <a target="_blank" href={thread}>
                <img
                  className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"
                  src="https://logowik.com/content/uploads/images/instagram-threads6682.logowik.com.webp"
                />
                <FiTwitter
                  style={{ display: "none" }}
                  className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"
                />
              </a>
            </span>
          </div>
          {/* <div className="relative overflow-hidden block footer-div cursor-pointer">
             <span className="block">
               <FaWhatsapp className="text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
             </span>
           </div> */}
        </div>
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {data.length > 0
          ? data.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => navigate(`/articles/${item.slug}`)}
              >
                <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">
                  <a className="relative block aspect-square">
                    <LazyLoadImage
                      alt="Thumbnail"
                      loading="lazy"
                      decoding="async"
                      className="object-cover transition-all"
                      sizes="(max-width: 768px) 30vw, 33vw"
                      srcSet={FILE_URL + item.image1Url}
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        color: "transparent",
                      }}
                    />
                    {/* <LazyLoadImage
                      key={index}
                      src={FILE_URL + item.image1Url}
                      height="100%"
                      effect="blur"
                      width="100%"
                      className="object-cover transition-all"
                      sizes="(max-width: 768px) 30vw, 33vw"
                      style={{ position: "absolute" }}
                    /> */}
                  </a>
                </div>
                <div className="">
                  <div className="flex gap-3">
                    <a>
                      <span className="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-[#452a72]">
                        {item.categoriesName}
                      </span>
                    </a>
                    {/* <a href="/category/lifestyle">
                                <span className="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-purple-600">{item.category2}</span>
                            </a> */}
                  </div>
                  <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2 dark:text-white">
                    <a>
                      <span className="bg-gradient-to-r bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
                        {item.title}
                      </span>
                    </a>
                  </h2>
                  <div className="hidden">
                    <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                      <a>{item.description}</a>
                    </p>
                  </div>
                  <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <div className="relative h-5 w-5 flex-shrink-0">
                        <LazyLoadImage
                          alt="Author"
                          effect="blur"
                          width="100%"
                          height="100%"
                          className="rounded-full object-cover w-[20px]"
                          src={FILE_URL + item.postedByDp}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {item.postedByname}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SingleMember;
