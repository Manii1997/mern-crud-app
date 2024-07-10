import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo }) => {
  return (
    <div className="flex gap-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-[100%] text-slate-950 font-medium bg-slate-200">
        {getInitials(userInfo?.fullName)}
      </div>
      <div className="self-center">
        <p>{userInfo?.fullName}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
