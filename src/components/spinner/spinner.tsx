export default function Spinner(): JSX .Element {
  return (
    <div data-testid="spinner" className="spinner-wrapper">
      <div className="container">
        <div className="spinner-inner">
          <div className="spinner-text">
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
}
