const Wellcome = () => {
    const userName = "Jane Doe"; // Hardcoded username
  
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center">
        <div className="w-32 mx-auto h-32 bg-blue-200 rounded-full flex items-center justify-center text-indigo-600 text-7xl font-bold">
          {userName.charAt(0)}
        </div>
        <div className="my-10 ">
          <h3 className="text-3xl text-blue-700 font-semibold">
            Welcome, {userName}!
          </h3>
        </div>
      </div>
    );
  };
  
  export default Wellcome;