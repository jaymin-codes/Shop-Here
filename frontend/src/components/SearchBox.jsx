import { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

function SearchBox() {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={handleSubmit}  >
      <div className="relative md:ml-[280px]">
        <label for="Search" className="sr-only">
          Search
        </label>

        <input
          type="text"
          id="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for..."
          className="w-full h-[50px] md:w-[350px] rounded-md border-2 border-gray-200 p-2 shadow-sm sm:text-sm"
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="submit" className="text-gray-600 hover:text-gray-700">
            <span className="sr-only">Search</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              className="h-5 w-5 text-[#0074d9]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
    </Form>
  );
}

export default SearchBox;

{
  /* <FormControl
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
         classNameName=""
      ></FormControl>
      <Button type="submit" variant="light"  classNameName="p-2 mx-2">
        <IoSearchOutline size={30}/>
      </Button> */
}
