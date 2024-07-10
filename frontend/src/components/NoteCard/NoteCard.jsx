import moment from "moment";
import { LuPin, LuPinOff } from "react-icons/lu";
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="note-card p-4 m-3 border rounded shadow-sm hover:shadow-md transition-all ease-in-out">
      <div className="note-header flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">
            {title}{" "}
            <span className="text-xs text-slate-500">
              {moment(date).format("Do MMM YYYY")}
            </span>
          </h3>
        </div>
        <div className="cursor-pointer flex gap-3">
          <button className="text-blue-500 text-sm cursor-pointer">
            <MdCreate onClick={onEdit} size={20} />
          </button>

          <button className="text-red-500 text-sm cursor-pointer">
            <MdDelete onClick={onDelete} size={20} />
          </button>
          <button onClick={onPinNote}>
            {isPinned ? (
              <LuPin className="text-sky-500 self-center" />
            ) : (
              <LuPinOff className="self-center" />
            )}
          </button>
        </div>
      </div>
      <p className="text-sm mt-2">{content}</p>
    </div>
  );
};

export default NoteCard;
