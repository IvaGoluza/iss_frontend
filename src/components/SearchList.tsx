import React from "react";

interface PersonType {
  id: number;
  name: string;
  works: string;
}
interface SearchListProps {
  data: PersonType[];
  input: string;
}

const SearchList: React.FC<SearchListProps> = ({ data, input }) => {
  const filteredData = data.filter((el) => {
    return el.name.toLowerCase().split(" ")[0].startsWith(input)
        || el.name.toLowerCase().split(" ")[1].startsWith(input)
        ||  (input.length >= 3 && el.name.toLowerCase().includes(input));
  });
  return (
      filteredData.length !== 0 && (
    <ul className="bg-gradient-to-t from-[#DAEFFB] to-[#A7D8F5] rounded-lg p-2 mt-1">
      {filteredData.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>)
  );
};

export default SearchList;
