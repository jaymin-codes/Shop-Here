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
    <Form onSubmit={handleSubmit} className="d-flex">
      <FormControl
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></FormControl>
      <Button type="submit" variant="light" className="p-2 mx-2">
        <IoSearchOutline size={30}/>
      </Button>
    </Form>
  );
}

export default SearchBox;
