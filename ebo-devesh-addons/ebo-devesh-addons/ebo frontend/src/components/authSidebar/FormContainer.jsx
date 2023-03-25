import Spinner from "../../assets/Spinner";
import Profile from "./Profile";
import MainForm from "./MainForm";

const FormContainer = ({ loggedIn, checkingStatus }) => {
  if (checkingStatus) {
    return (
      <div className="pl-7 pr-12 md:pr-8">
        <Spinner />
      </div>
    );
  }

  if (loggedIn) {
    return (
      <div className="pl-7 pr-12 md:pr-8">
        <Profile />
      </div>
    );
  }

  return (
    <div className="pl-7 pr-12 md:pr-8">
      <MainForm />
    </div>
  );
};

export default FormContainer;
