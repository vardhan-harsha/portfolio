import { useRef, useEffect } from 'react';
// import ThreeScene from './components/three'
import ParticleSimulation from './components/Particles'
import './App.css';
function App() {
  const sectionRefs = useRef([]);

  sectionRefs.current = [];

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    const options = {
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.scrollTo({
            top: entry.target.offsetTop,
            behavior: 'smooth',
          });
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    sectionRefs.current.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className='App'>
      {/* <div ref={addToRefs} style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
        <header className="App-header">
          <div className='typewriter'>
            <h1>Hi! I'm Harsha Vardhan Moka </h1>
          </div>
        </header>
      </div> */}

      <div ref={addToRefs} style={{ height: '100vh', backgroundColor: '#d0d0d0' }}>
        <ParticleSimulation />
      </div>

      {/* <div ref={addToRefs} style={{ height: '100vh', backgroundColor: '#b0b0b0' }}>
        <ThreeScene />
      </div> */}
    </div>
  );
}

export default App;
