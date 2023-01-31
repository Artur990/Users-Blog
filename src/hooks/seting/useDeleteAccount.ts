import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export const useDeleteAccount = () => {
  const { deleteAccount } = useAuth();

  const handleSubmit = async () => {
    try {
      deleteAccount();
      toast.success("Twoje konot zostało usunięte");
    } catch (error) {
      toast.success("Coś poszło nie tak");
    }
  };
  return { handleSubmit };
};
