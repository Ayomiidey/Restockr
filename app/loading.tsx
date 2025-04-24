import Image from "next/image";
import spinner from "@/assets/spinner2.gif";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw] ">
      <Image src={spinner} alt="loading..." height={150} width={150} />
    </div>
  );
};

export default LoadingPage;
