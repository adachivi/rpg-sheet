const LoadingPopup = ({ isOpen, children }) => {

  if (!isOpen) {
    return (null);
  }
  else {
    return (
    <>
      <div className="modal">
        {children}
      </div>

      <style>{`

      .modal {
        position: fixed;
        top: 0.5%;
        left: 50%;
        transform: translate(-50%);
        background: #fff;
        padding: 20px 25px 15px;
        border-radius: 20px;
        box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
        z-index: 1000
      }

      `}</style>
    </>
    );
  };

}

export default LoadingPopup;