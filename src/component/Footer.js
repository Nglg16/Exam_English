import React from 'react';

function Footer() {
  return (
    <footer className="py-2.7 bg-dark">
  <div className="container">
    <div className="row">
      <div className="col-lg-4 d-flex align-items-center">
        <h5 className="text-white mb-4" style={{ marginTop: '20px' }}>
          <img
            src="https://cdn.haitrieu.com/wp-content/uploads/2022/09/Logo-Anh-Ngu-Apollo.png"
            alt="Logo"
            style={{ width: '60%', maxWidth: '230px' }} 
          />
        </h5>
      </div>

      <div className="col-lg-4 d-flex align-items-center">
      <div>
  <h5 className="text-white text-center mb-4">Địa chỉ</h5>
  <p className="text-white text-center" style={{ fontFamily: 'Arial, sans-serif', marginBottom: '0' }}>Đại học FPT, Thạch Thất, Hà Nội, Việt Nam</p>
</div>

      </div>

      <div className="col-lg-4 d-flex align-items-center justify-content-end">
        <div>
          <h5 className="text-white mb-4">Thông tin liên hệ</h5>
          <p className="text-white" style={{ fontFamily: 'Arial, sans-serif', marginBottom: '5px' }}>Email: ngoluong@gmail.com</p>
          <p className="text-white" style={{ fontFamily: 'Arial, sans-serif', marginBottom: '0' }}>Hotline: 0362.593.999</p>
        </div>
      </div>
    </div>
  </div>
</footer>

  );
}

export default Footer;
