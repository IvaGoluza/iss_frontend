import React, { SetStateAction, useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { SubjectType } from './EmployeePage';

interface NewSubjectModalProps {
  employeeId: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSubjects: React.Dispatch<SetStateAction<SubjectType[]>>;
}

type SubjectAllType = {
  idSubject: number;
  subjectName: string;
};

type newSubjectType = {
  idUser: number;
  subjectName: string;
  numberOfHours: number;
  subjectClass: number;
};

export default function NewSubjectModal({
  employeeId,
  isModalOpen,
  setSubjects,
  setIsModalOpen,
}: NewSubjectModalProps) {
  const [formData, setFormData] = useState<newSubjectType>({
    idUser: 0,
    subjectName: '',
    subjectClass: 0,
    numberOfHours: 0,
  });
  const [allSubjects, setAllSubjects] = useState<SubjectAllType[]>();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/subject/getAll', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setAllSubjects(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const parsedFormData = {
        ...formData,
        idUser: employeeId,
        subjectClass: Number(formData.subjectClass),
        numberOfHours: Number(formData.numberOfHours),
      };

      const response = await axios.post(
        'http://localhost:8080/employee/subject/create',
        parsedFormData
      );

      setSubjects((prevSubjects) => [...prevSubjects, response.data]);
      setIsModalOpen(false);
      setFormData({
        idUser: 0,
        subjectName: '',
        subjectClass: 0,
        numberOfHours: 0,
      });
    } catch (error) {
      console.error('Error creating new subject:', error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className="bg-white rounded-xl shadow-lg py-10 px-16 max-w-md mx-auto mt-16"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Dodaj novi predmet</h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Naziv
          </label>
          <select
            name="subjectName"
            value={formData.subjectName}
            onChange={handleInputChange}
            className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2"
          >
            <option value="">Odaberi predmet</option>
            {allSubjects?.map((subject) => (
              <option key={subject.idSubject} value={subject.subjectName}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Razred
          </label>
          <input
            type="number"
            name="subjectClass"
            value={formData.subjectClass}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tjedni broj sati
          </label>
          <input
            type="number"
            name="numberOfHours"
            value={formData.numberOfHours}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mx-1"
            onClick={closeModal}
          >
            Odustani
          </button>
          <button
            type="submit"
            className="bg-gradient-to-tr hover:bg-gradient-to-tl from-[#8DFC00] to-[#EAFD06] text-[#03294D] font-bold py-2 px-4 rounded-lg"
          >
            Dodaj
          </button>
        </div>
      </form>
    </Modal>
  );
}
