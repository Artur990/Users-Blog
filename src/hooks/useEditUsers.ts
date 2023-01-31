import { doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { db } from "../firebase/config";
import { EditUserType } from "../types/editUsersType";
import { EditUsersSchemaType } from "../utils/schemas/EditUsersSchema ";

const useEditUsers = (props: EditUserType) => {
  const postCollectionRef = doc(db, "Users", props.id);
  const { register, handleSubmit, setValue } = useForm<EditUsersSchemaType>({
    defaultValues: {
      name: props.name,
      email: props.email,
      password: props.password,
      phoneNumber: props.phoneNumber,
    },
  });

  const onSubmit = async (data: EditUsersSchemaType) => {
    try {
      await updateDoc(postCollectionRef, {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      });
      toast.success("Twój post został dodany");
    } catch (error) {
      toast.error("Coś poszło nie tak");
    }
  };
  return { register, handleSubmit, setValue, onSubmit };
};

export default useEditUsers;
