import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FormBuilder from "../components/FormBuilder";
import { FormSchema } from "../assets/types";
import { setCurrentForm } from "../store/actions";

const CreateFormPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize a new form when component mounts
    const newForm: FormSchema = {
      id: `form-${Date.now()}`,
      name: "Untitled Form",
      createdAt: new Date().toISOString(),
      fields: [],
    };
    dispatch(setCurrentForm(newForm));

    // Cleanup when component unmounts
    return () => {
      dispatch(setCurrentForm(null));
    };
  }, [dispatch]);

  return <FormBuilder />;
};

export default CreateFormPage;
