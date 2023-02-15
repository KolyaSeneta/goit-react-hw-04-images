import {  useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Api } from './Api/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

export const App = () => {
  
  const [state, setState] = useState({
   images: [],
    isLoading: false,
    currentSearch: '',
    pageNum: 1,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
 })

  // state = {
  //   images: [],
  //   isLoading: false,
  //   currentSearch: '',
  //   pageNum: 1,
  //   modalOpen: false,
  //   modalImg: '',
  //   modalAlt: '',
  // };

 const  handleSubmit = async e => {
    e.preventDefault();
    setState((prev)=>({...prev, isLoading: false }));
    const inputForSearch = e.target.elements.inputForSearch;
    if (inputForSearch.value.trim() === '') {
      return toast.error('Please, enter the text!');
    } else {
      setState((prev)=>({...prev, isLoading: true }));
    }
    
    const response = await  Api(inputForSearch.value, 1);
    setState((prev)=>({...prev,
      images: response,
      isLoading: false,
      currentSearch: inputForSearch.value,
      pageNum: 1,
    }));
  };

 const  handleClickMore = async () => {
    const response = await  Api(
      state.currentSearch,
      state.pageNum + 1
    );
    setState((prev)=>({...prev,
      images: [...state.images, ...response],
      pageNum: state.pageNum + 1,
    }));
  };

  const handleImageClick = e => {
    setState((prev)=>({...prev,
      modalOpen: true,
      modalAlt: e.target.alt,
      modalImg: e.target.name,
    }));
  };

  const  closeImage = () => {
    setState((prev) =>({...prev,
      modalOpen: false,
    }));
  };





    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Searchbar onSubmit={handleSubmit} />
            <ImageGallery
              onImageClick={handleImageClick}
              images={state.images}
            />
            {state.images.length > 0 ? (
              <Button onClick={handleClickMore} />
            ) : null}
          </React.Fragment>
        )}
        {state.modalOpen ? (
          <Modal
            src={state.modalImg}
            alt={state.modalAlt}
            closeImage={closeImage}
          />
        ) : null}
        <ToastContainer />
      </div>
    );
  }
