import './App.css'

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-primary fw-semibold">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Track workouts, build teams, and compete.</h1>
              <p className="text-muted lead mb-4">
                A modern multi-tier app with a React 19 frontend and a Node.js + Express backend.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a className="btn btn-primary btn-lg" href="http://localhost:8000/health">
                  Check API
                </a>
                <a className="btn btn-outline-secondary btn-lg" href="https://react.dev">
                  Learn React
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
