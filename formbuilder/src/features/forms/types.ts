import { FormField } from '../currentForm/types';

export interface SavedForm {
  id: string;
  name: string;
  createdAt: string;
  fields: FormField[];
}