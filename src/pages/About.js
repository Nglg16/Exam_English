import React from 'react';
import Footer from '../component/Footer';

const slide1 = "https://cdn.haitrieu.com/wp-content/uploads/2022/09/Logo-Anh-Ngu-Apollo.png";
const slide2 = "https://cdn.haitrieu.com/wp-content/uploads/2022/09/Logo-Anh-Ngu-Apollo.png";

function About() {
  return (
    <div className=''>
      <section className="py-3 py-md-5 py-xl-10">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 col-lg-8">
              <h3 className="fs-5 mb-2 text-secondary text-uppercase">About</h3>
              <h2 className="display-5 mb-4">At our core, we prioritize pushing boundaries, embracing the unknown, and fostering a culture of continuous learning.</h2>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row gy-3 gy-md-4 gy-lg-0">
            <div className="col-12 col-lg-6">
              <div className="card bg-light p-3 m-0">
                <div className="row gy-3 gy-md-0 align-items-md-center">
                  <div className="col-md-5">
                    <img src={slide1} className="img-fluid rounded-start" alt="slide1"
                   
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-0">
                      <h2 className="card-title h4 mb-3">Why Choose Us?</h2>
                      <p className="card-text lead">With years of experience and deep industry knowledge, we have a proven track record of success and are pushing ourselves to stay ahead of the curve.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="card bg-light p-3 m-0">
                <div className="row gy-3 gy-md-0 align-items-md-center">
                  <div className="col-md-5">
                    <img src={slide2} className="img-fluid rounded-start" alt="slide2"/>
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-0">
                      <h2 className="card-title h4 mb-3">Visionary Team</h2>
                      <p className="card-text lead">With a team of visionary engineers, developers, and creative minds, we embark on a journey to transform complex challenges into ingenious technological solutions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}


export default About;
