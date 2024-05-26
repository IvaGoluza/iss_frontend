import React from 'react';
import { EmployeeType } from '../pages/Employees/Employees';
import { Link } from 'react-router-dom';

interface SearchListProps {
  data: EmployeeType[];
  input: string;
}

const SearchList: React.FC<SearchListProps> = ({ data, input }) => {
  const filteredData = data.filter((el) => {
    return (
      el.name
        .toLowerCase()
        .split(' ')
        .some((namePart) => namePart.startsWith(input)) ||
      (input.length >= 3 && el.name.toLowerCase().includes(input))
    );
  });
  return (
    filteredData.length !== 0 && (
      <ul className="bg-gradient-to-t from-[#DAEFFB] to-[#A7D8F5] rounded-lg p-2 mt-1">
        {filteredData.map((item) => (
          <Link to={`/employees/${item.id}`} key={item.id}>
            <li key={item.id}>{item.name}</li>
          </Link>
        ))}
      </ul>
    )
  );
};

export default SearchList;
