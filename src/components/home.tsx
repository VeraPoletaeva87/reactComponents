import { Outlet, useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  const uncontrolledClick = () => {
    navigate(`/uncontrolled`);
  };

  const controlledClick = () => {
    navigate(`/controlled`);
  };

  return (
    <div className="flex">
       <button onClick={uncontrolledClick}>uncontrolled form</button>
       <button onClick={controlledClick}>controlled form</button>
    </div>
  );
}

export default Home;