import React, { useEffect } from "react";
import FormBuilder from "../components/FormBuilder";
import { FormSchema } from "../assets/types";
import { setCurrentForm } from "../store/actions";
import { useAppDispatch } from "../hooks/hooks";

const CreateFormPage: React.FC = () => {
  const dispatch = useAppDispatch();

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
