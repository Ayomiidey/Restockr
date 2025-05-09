// import Image from "next/image";
// import spinner from "@/assets/spinner2.gif";

const LoadingPage = () => {
  return (
    // <div className="flex justify-center items-center h-[100vh] w-[100vw] ">
    //   <Image src={spinner} alt="loading..." height={150} width={150} />
    // </div>
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
    </div>
  );
};

export default LoadingPage;
