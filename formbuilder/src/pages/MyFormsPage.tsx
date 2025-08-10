import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FormList from "../components/FormList";
import { loadFormsFromStorage } from "../utils/localStorage";
import { setCurrentForm } from "../store/actions";

const MyFormsPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load forms from localStorage when component mounts
    const forms = loadFormsFromStorage();
    Object.values(forms).forEach((form: any) => {
      dispatch({ type: "CREATE_FORM", payload: form });
    });
  }, [dispatch]);

  return <FormList />;
};

export default MyFormsPage;
