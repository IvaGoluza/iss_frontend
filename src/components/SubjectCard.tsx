import React, { SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTableList,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import * as Yup from 'yup';
import { ValidationError } from 'yup';
import toast from 'react-hot-toast';
import { EmployeeType } from '../pages/Employees/Employees';
import { StatusType, SubjectType } from '../pages/Employees/EmployeePage';

type SubjectCardProps = {
  data: SubjectType;
  count: number;
  setSubjects: React.Dispatch<SetStateAction<SubjectType[]>>;
};

export type EditableTypes = {
  status: string;
  subjectClass: number;
  numberOfHours: number;
};

const validationSchema = Yup.object().shape({
  numberOfHours: Yup.number('Broj.').required('Broj sati je obvezan.'),
  subjectClass: Yup.number('Broj.').required('Razred je obvezan.'),
  status: Yup.string().required('Status je obvezan.'),
});

export default function SubjectCard({
  data,
  count,
  setSubjects,
}: SubjectCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<EmployeeType>>({});
  const [inputValues, setInputValues] = useState<EditableTypes>({
    status: data.status,
    subjectClass: data.subjectClass,
    numberOfHours: data.numberOfHours,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleDeleteEmployee = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/employee/subject/delete/${data.idEmployeeSubject}`
      );

      setSubjects((prevSubjects) =>
        prevSubjects.filter(
          (subject) => subject.idEmployeeSubject !== data.idEmployeeSubject
        )
      );
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const toggleEditOrSave = async () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      try {
        await validationSchema.validate(inputValues, { abortEarly: false });

        const subjectData = {
          idEmployeeSubject: data.idEmployeeSubject,
          numberOfHours: inputValues.numberOfHours,
          status: inputValues.status,
          subjectClass: inputValues.subjectClass,
        };

        const response = await axios.put(
          'http://localhost:8080/employee/subject/update',
          subjectData
        );
        setSubjects((prevSubjects) =>
          prevSubjects.map((subject) =>
            subject.idEmployeeSubject === data.idEmployeeSubject
              ? { ...subject, ...subjectData }
              : subject
          )
        );
        setFormErrors({});
        toast.success('Izmjene su spremljene.', {
          position: 'bottom-center',
          duration: 3000,
          className: 'scale-125',
        });
      } catch (error) {
        console.log(error);
        if (error instanceof ValidationError) {
          const errors = {};
          error.inner.forEach((err) => {
            errors[err.path] = err.message;
          });
          setFormErrors(errors);
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-9 grid-rows-1 text-[#003362] font-bold bg-white items-center justify-items-center py-2 lg:w-3/4 m-2 rounded-2xl">
      <p className={`text-center col-span-1 w-16 rounded-lg`}> {count}</p>
      <p className={`col-span-2 w-24 text-center rounded-lg`}>
        {data.subjectName}
      </p>
      <input
        type="text"
        name="subjectClass"
        value={inputValues.subjectClass}
        onChange={handleInputChange}
        className={`text-center col-span-1 w-16 ${isEditing ? 'bg-[#BBE1F8]' : ''} rounded-lg outline-none`}
        readOnly={!isEditing}
      />
      <input
        type="text"
        name="numberOfHours"
        value={inputValues.numberOfHours}
        onChange={handleInputChange}
        className={`text-center col-span-1 w-16 ${isEditing ? 'bg-[#BBE1F8]' : ''} rounded-lg outline-none`}
        readOnly={!isEditing}
      />
      <select
        name="status"
        value={inputValues.status}
        onChange={handleInputChange}
        className={`text-center col-span-2 w-28 ${isEditing ? 'bg-[#BBE1F8]' : ''} rounded-lg outline-none`}
        disabled={!isEditing}
      >
        <option value="">Odaberi status</option>
        {data?.allStatus?.map((status: StatusType) => (
          <option key={status.idStatusPlan} value={status.status}>
            {status.status}
          </option>
        ))}
      </select>
      <div className="col-span-2 flex flex-row justify-items-center w-full">
        <div className="mx-1.5 text-white bg-gradient-to-tr hover:bg-gradient-to-tl from-[#E949EC] to-[#FF6736] p-1 rounded-lg border border-[#B833BA]">
          <FontAwesomeIcon icon={faTableList} className="mx-1" />
        </div>
        <div
          className={`mx-1.5 bg-gradient-to-tr hover:bg-gradient-to-tl from-[#8DFC00] to-[#EAFD06] p-1 rounded-lg border border-[#03294D] cursor-pointer ${isEditing ? 'text-black' : ''}`}
          onClick={toggleEditOrSave}
        >
          {isEditing ? (
            <p className="text-sm">Spremi</p>
          ) : (
            <FontAwesomeIcon icon={faPenToSquare} className="mx-1" />
          )}
        </div>
        <div
          onClick={handleDeleteEmployee}
          className="mx-1.5 bg-gradient-to-tr hover:bg-gradient-to-tl from-[#C72222] to-[#F60404] text-white text-sm p-1.5 rounded-lg border border-[#941717]"
        >
          <FontAwesomeIcon icon={faTrashCan} className="mx-1" />
        </div>
      </div>
    </div>
  );
}
