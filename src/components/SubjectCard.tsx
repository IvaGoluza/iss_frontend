import React, { useState } from 'react';
import {
  faPenToSquare,
  faTableList,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SubjectCardProps {
  id: number;
  name: string;
  subjectClass: string;
  hours: number;
  status: string;
  userId: number;
}

interface EditableSubjectValues {
  subjectClass: string;
  hours: number;
  status: string;
}
export default function SubjectCard({
  id,
  status,
  userId,
  hours,
  subjectClass,
  name,
}: SubjectCardProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<EditableSubjectValues>({
    subjectClass: subjectClass,
    hours: hours,
    status: status,
  });

  return (
    <div className="grid grid-cols-9 grid-rows-1 text-[#003362] font-bold bg-white items-center justify-items-center py-2 lg:w-3/4 m-2 rounded-2xl">
      <p>{id}</p>
      <p className="col-span-2">{name}</p>
      {editMode ? (
        <p>{subjectClass}</p>
      ) : (
        <input className="outline-none" value={editValues.subjectClass} />
      )}
      {editMode ? (
        <p>{hours}</p>
      ) : (
        <input className="outline-none" value={editValues.hours} />
      )}
      {editMode ? (
        <p className="col-span-2">{status}</p>
      ) : (
        <input className="outline-none col-span-2" value={editValues.status} />
      )}
      <div className="co-span-2 flex flex-row justify-items-center w-full">
        <div className="mx-1.5 text-white bg-gradient-to-tr hover:bg-gradient-to-tl from-[#E949EC] to-[#FF6736] p-1 rounded-lg border border-[#B833BA]">
          <FontAwesomeIcon icon={faTableList} className="mx-1" />
        </div>
        <div
          className="mx-1.5 bg-gradient-to-tr hover:bg-gradient-to-tl from-[#8DFC00] to-[#EAFD06] p-1 rounded-lg border border-[#03294D]"
          onClick={() => setEditMode((prevState) => !prevState)}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="mx-1" />
        </div>
        <div className="mx-1.5 bg-gradient-to-tr hover:bg-gradient-to-tl from-[#C72222] to-[#F60404] text-white text-sm p-1.5 rounded-lg border border-[#941717]">
          <FontAwesomeIcon icon={faTrashCan} className="mx-1" />
        </div>
      </div>
    </div>
  );
}
