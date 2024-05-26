import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ValidationSchema } from './NewEmployeeModal';
import { ValidationError } from 'yup';
import { useNavigate } from 'react-router-dom';

import {
  faFloppyDisk,
  faTrashCan,
  faCaretLeft,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { EmployeeType } from './Employees';
import toast from 'react-hot-toast';
import SubjectsDisplay from '../../components/SubjectsDisplay';

export type StatusType = {
  idStatusPlan: number;
  status: string;
};

export type SubjectType = {
  idEmployeeSubject: number;
  subjectName: string;
  status: string;
  yearlyPlan: string;
  subjectClass: number;
  numberOfHours: number;
  allStatus: StatusType[];
};

function getEmployeeIdFromPath() {
  const path = window.location.pathname;
  const parts = path.split('/');
  return Number(parts[parts.length - 1]);
}

type AktivType = {
  idAktiv: number;
  aktivName: string;
};

type employeeAktivType = {
  employee: EmployeeType;
  aktivList: AktivType[];
};

const initialValues: EmployeeType = {
  id: 0,
  name: '',
  email: '',
  dateStart: '',
  position: '',
  dateEnd: '',
  aktivName: '',
};

function formatDateString(dateString: string | undefined | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const EmployeePage: React.FC = () => {
  const [employee, setEmployee] = useState<EmployeeType>(initialValues);
  const [subjects, setSubjects] = useState<SubjectType[]>();
  const [aktivList, setAktivList] = useState<AktivType[]>([]);
  const [formErrors, setFormErrors] = useState<Partial<EmployeeType>>({});
  const [id, setId] = useState<number>(getEmployeeIdFromPath());

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await ValidationSchema.validate(employee, { abortEarly: false });

      const employeeData = {
        idUser: id,
        name: employee.name,
        email: employee.email,
        position: employee.position,
        idAktiv:
          aktivList.find((item) => item.aktivName === employee.aktivName)
            ?.idAktiv ?? null,
        dateStart: employee.dateStart,
        dateEnd: employee.dateEnd ? employee.dateEnd : null,
      };

      await axios.put('http://localhost:8080/employee/update', employeeData);

      setFormErrors({});
      toast.success('Izmjene informacija o djelatniku su spremljene.', {
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
  };

  const navigate = useNavigate();

  const handleDeleteEmployee = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/employee/delete/${employee.id}`
      );
      navigate('/employees');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/employee/getEmployee/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data: employeeAktivType = response.data;
      setEmployee({
        ...data.employee,
        dateStart: formatDateString(data.employee.dateStart),
        dateEnd: formatDateString(data.employee.dateEnd),
      });
      setAktivList(data.aktivList);

      if (response.data.employee.id) {
        axios
          .get(
            `http://localhost:8080/employee/${response.data.employee.id}/subjects`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((responseSubject) => {
            setSubjects(responseSubject.data);
          })
          .catch((error) => {
            console.error('Error fetching subject data:', error);
          });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const previousEmpHandler = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/employee/getPrev/${employee.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data === '') return;
      const data: employeeAktivType = response.data;
      setEmployee({
        ...data.employee,
        dateStart: formatDateString(data.employee.dateStart),
        dateEnd: formatDateString(data.employee.dateEnd),
      });
      setAktivList(data.aktivList);
      if (response.data.employee.id) {
        const responseSubject = await axios.get(
          `http://localhost:8080/employee/${response.data.employee.id}/subjects`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setSubjects(responseSubject.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const nextEmpHandler = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/employee/getNext/${employee.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data === '') return;
      const data: employeeAktivType = response.data;
      setEmployee({
        ...data.employee,
        dateStart: formatDateString(data.employee.dateStart),
        dateEnd: formatDateString(data.employee.dateEnd),
      });
      setAktivList(data.aktivList);
      if (response.data.employee.id) {
        const responseSubject = await axios.get(
          `http://localhost:8080/employee/${response.data.employee.id}/subjects`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setSubjects(responseSubject.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  return (
    <>
      <div className="p-10 pr-0 w-[80%] md:w-[60%] bg-gradient-to-br from-[#BEE5FD] to-[#F5FCFF] rounded-xl m-auto mt-14 relative border border-1 border-cyan-500">
        <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text uppercase col-span-3 mb-3">
          djelatnik info
        </h1>
        <div className="grid grid-cols-2 grid-rows-3">
          <div className="my-1">
            {' '}
            <p className="font-bold text-[#003362] text-sm">
              Ime i prezime djelatnika
            </p>{' '}
            <input
              type="text"
              name="name"
              value={employee?.name}
              onChange={handleInputChange}
              className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2"
            />
            {formErrors.name && (
              <p className="text-red-500">{formErrors.name}</p>
            )}
          </div>
          <div className="my-1">
            {' '}
            <p className="font-bold text-[#003362] text-sm">
              Email adresa
            </p>{' '}
            <input
              type="email"
              name="email"
              value={employee?.email}
              onChange={handleInputChange}
              className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2"
            />
            {formErrors.email && (
              <p className="text-red-500">{formErrors.email}</p>
            )}
          </div>
          <div className="my-1">
            {' '}
            <p className="font-bold text-[#003362] text-sm">
              Početak radnog odnosa
            </p>{' '}
            <input
              type="date"
              name="dateStart"
              value={employee?.dateStart}
              onChange={handleInputChange}
              className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2"
            />
            {formErrors.dateStart && (
              <p className="text-red-500">{formErrors.dateStart}</p>
            )}
          </div>
          <div className="my-1">
            {' '}
            <p className="font-bold text-[#003362] text-sm">
              Tip nastavnika
            </p>{' '}
            <input
              type="text"
              name="position"
              value={employee?.position}
              onChange={handleInputChange}
              className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2"
            />
            {formErrors.position && (
              <p className="text-red-500">{formErrors.position}</p>
            )}
          </div>
          <div className="my-1">
            {' '}
            <p className="font-bold text-[#003362] text-sm">
              Kraj radnog odnosa
            </p>{' '}
            <input
              type="date"
              name="dateEnd"
              value={employee?.dateEnd ? employee?.dateEnd : ''}
              onChange={handleInputChange}
              className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2"
            />
          </div>
          <div className="my-1">
            {' '}
            <p className="font-bold text-[#003362] text-sm">Aktiv</p>{' '}
            <select
              name="aktivName"
              value={employee?.aktivName ? employee.aktivName : ''}
              onChange={handleInputChange}
              className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2"
            >
              <option value="">Odaberi aktiv</option>
              {aktivList.map((aktiv) => (
                <option key={aktiv.idAktiv} value={aktiv.aktivName}>
                  {aktiv.aktivName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-end text-white font-bold text-sm mt-10 mr-10">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-tr hover:bg-gradient-to-tl  from-[#43C722] to-[#3DF310] rounded-lg px-5 py-2 mx-1 shadow-xl"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="mr-1" />
            Spremi
          </button>
          <button
            onClick={handleDeleteEmployee}
            className="px-5 bg-gradient-to-tr hover:bg-gradient-to-tl from-[#C72222] to-[#F60404] rounded-lg mx-1 shadow-xl flex flex-row items-center"
          >
            <FontAwesomeIcon icon={faTrashCan} className="mr-1" />
            Obriši
          </button>
        </div>

        <button
          onClick={previousEmpHandler}
          className="absolute -left-16 top-[45%] bg-gradient-to-r hover:bg-gradient-to-tr from-cyan-500 to-blue-500 px-4 py-1 rounded-lg shadow-xl border"
        >
          <FontAwesomeIcon icon={faCaretLeft} className="text-3xl text-white" />
        </button>
        <button
          onClick={nextEmpHandler}
          className="absolute -right-16 top-[45%] bg-gradient-to-r hover:bg-gradient-to-tr from-cyan-500 to-blue-500 px-4 py-1 rounded-lg shadow-xl"
        >
          <FontAwesomeIcon
            icon={faCaretRight}
            className="text-3xl text-white"
          />
        </button>
      </div>
      <SubjectsDisplay
        employeeId={employee.id}
        employeeName={employee.name}
        subjects={subjects}
        setSubjects={setSubjects}
      />
    </>
  );
};

export default EmployeePage;
