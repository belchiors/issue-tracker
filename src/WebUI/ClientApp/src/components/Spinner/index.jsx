import './styles.css';

function Spinner() {
  return (
    <div className="d-flex justify-content-center">
      <div className="loader spinner-grow" role="status"></div>
    </div>
  );
}

export default Spinner;
