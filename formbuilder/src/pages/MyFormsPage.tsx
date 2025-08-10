import React, { useEffect } from "react";
import FormList from "../components/FormList";
import { loadFormsFromStorage } from "../utils/localStorage";
import { setCurrentForm } from "../store/actions";
import { useAppDispatch } from "../hooks/hooks";

const MyFormsPage: React.FC = () => {
  const dispatch = useAppDispatch();

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
