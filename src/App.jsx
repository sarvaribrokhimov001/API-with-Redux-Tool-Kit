import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {fetchUsers} from "./users/UsersSlice";

const App = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(true);
  console.log(users);

  useEffect(() => {
    dispatch(fetchUsers());

    const setTime = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(setTime);
  }, []);

  if (users.Loading || loading) 
    return <h2 className="text-center font-bold mt-8 text-gray-900 text-[50px]"> Loading.... </h2>;
  if (users.Error) 
    return <h2 className="text-center text-red-600 text-shadow-red-600 text-[50px]"> {users.Error} </h2>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-[30px] bg-gray-950">
      <h2 className="text-[40px] font-black mb-6 text-white"> Users </h2>
      <div className="flex flex-wrap w-full max-w-[1000px] gap-[15px] justify-start items-start ">
        {users.data?.map(({id , name , phone , email , address , company})=> (
          <div key={id} className="p-6 w-[323px] bg-black rounded-[18px]">
            <p className="font-sans text-[23px] text-cyan-500 font-bold text-center"> UserNumber {id} </p>
            <p className="font-sans text-[15px] text-green-600 font-bold"> <span className="text-red-600"> Username </span> : {name} </p>
            <p className="font-sans text-[15px] text-green-600 font-bold"> <span className="text-red-600"> PhoneNumber </span> : {phone} </p>
            <p className="font-sans text-[15px] text-green-600 font-bold"> <span className="text-red-600"> Email </span> : {email} </p>
            <p className="font-sans text-[15px] text-green-600 font-bold"> <span className="text-red-600"> Street </span> : {address?.street} </p>
            <p className="font-sans text-[15px] text-green-600 font-bold"> <span className="text-red-600"> City </span> : {address?.city} </p>
            <p className="font-sans text-[15px] text-green-600 font-bold"> <span className="text-red-600"> CompanyName </span> : {company?.name} </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;