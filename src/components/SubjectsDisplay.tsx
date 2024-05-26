import React, { SetStateAction, useState } from 'react';
import Modal from 'react-modal';

import SubjectCard from './SubjectCard';
import { nanoid } from 'nanoid';
import { SubjectType } from '../pages/Employees/EmployeePage';
import NewSubjectModal from '../pages/Employees/NewSubjectModal';
Modal.setAppElement('#root');

type SubjectDisplayProps = {
  employeeName: string;
  employeeId: number;
  subjects: SubjectType[] | undefined;
  setSubjects: React.Dispatch<SetStateAction<SubjectType[]>>;
};

export default function SubjectsDisplay({
  employeeName,
  employeeId,
  subjects,
  setSubjects,
}: SubjectDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  let counter = 1;

  return (
    <>
      <img
        className="rotate-180 transform w-full"
        src="../../../assets/svgs/wave.svg"
        alt="wave"
      />
      <div className="w-full bg-gradient-to-b from-[#647CF6] to-[#ACB9FA] min-h-screen flex flex-col items-center pt-5">
        <div className="flex flex-row">
          <h1 className="text-xl lg:text-3xl font-extrabold text-white mr-10 md:mr-24 uppercase">
            predmeti djelatnika {employeeName}
          </h1>
          <button
            className="text-white bg-transparent border border-white font-semibold text-sm rounded-xl px-3 py-1 hover:border-2"
            onClick={openModal}
          >
            Dodaj novi predmet
          </button>
        </div>
        <div className="py-4 w-full flex flex-col items-center">
          <div className="grid grid-cols-9 text-center grid-rows-1 text-white font-semibold items-center justify-items-center py-2 md:w-3/4 m-2 rounded-2xl pt-5">
            <p>#</p>
            <p className="col-span-2">Naziv</p>
            <p>Razred</p>
            <p>Tjedni broj sati</p>
            <p className="col-span-2">Status plana rada</p>
          </div>
          {subjects?.map((subject: SubjectType) => {
            const count = counter++; // Use and increment counter
            return (
              <SubjectCard
                data={subject}
                count={count}
                key={nanoid()}
                setSubjects={setSubjects}
              />
            );
          })}
        </div>
      </div>
      <NewSubjectModal
        employeeId={employeeId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setSubjects={setSubjects}
      />
    </>
  );
}
