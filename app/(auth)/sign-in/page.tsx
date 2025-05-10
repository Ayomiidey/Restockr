import { Dispatch, SetStateAction } from "react";
import SignInForm from "./signInForm";

const SignInPage = ({
  setIsLoginOpen,
}: {
  setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <SignInForm setIsLoginOpen={setIsLoginOpen} />
    </>
  );
};

export default SignInPage;
