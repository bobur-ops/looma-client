import { selectUser } from "@/features/auth/model/auth-slice";
import { useAppSelector } from "@/hooks/redux";

export const UserPopover = () => {
  const user = useAppSelector(selectUser);

  return <div className="bg-accent p-4 border-t truncate">{user?.email}</div>;
};
