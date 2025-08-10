const LoadingPopup = ({ isOpen, children }) => {

  if (!isOpen) {
    return (null);
  }
  else {
    return (
    <>
      <div className="modal">
        <div className="spinner"></div>
        {children}
      </div>

      <style>{`

      p {
        text-align: center;
        margin: 5px 0px 5px 0px;
      }

      .modal {
        position: fixed;
        top: 1%;
        left: 50%;
        transform: translate(-50%);
        background: #fff;
        padding: 15px 20px 15px;
        border-radius: 20px;
        box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      @keyframes spin {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
      }

      .spinner {
        width: 15px;
        height: 15px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 7px;
        border: 5px solid rgb(204,204,204);
        border-top: 5px solid rgb(51,51,51);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      `}</style>
    </>
    );
  };

}

export default LoadingPopup;