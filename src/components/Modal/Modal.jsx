import propTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

 const Modal = ({closeImage, src, alt}) => {

//   useEffect(() => {
//     document.addEventListener('keydown', closeImageModal);
//     return () => { document.removeEventListener('keydown', closeImageModal)}
// },[])

   useEffect(() => {
     const modalClickClose = (e) => {
     if (e.code === 'Escape') {
      closeImage();
    }
   }
   document.addEventListener('keydown', modalClickClose);
   
    return () => { document.removeEventListener('keydown', modalClickClose)}
},[closeImage])

  //   closeImage = (e) => {
    
  //   if (e.target === e.currentTarget && e.code === 'Escape') {
  //     closeImage();
  //   }
  // };

   
   
  const closeImageModal = (e) => {
 
    if (e.target === e.currentTarget) {
      closeImage();
    }
  };

   
    

    return (
       <div className={css.Overlay} onClick={closeImageModal}>
       <div className={css.Modal}>
      <img src={src} alt={alt} />
        </div>
      </div>
    );
  }

 

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  closeImage: propTypes.func.isRequired,
};
 export default Modal