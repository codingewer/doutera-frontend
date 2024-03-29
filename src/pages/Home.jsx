import React, { useEffect, useRef, useState } from 'react'
import "./home.css"
import TopBar from '../bars/TopBar'
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { GetDetailsAsync } from '../Api/Details/DetailSlice';
import { GetAllProducts } from '../Api/Products/ProductSlice';
import Footer from '../bars/Footer';

function Home() {
  const details = useSelector(state => state.details.detailsReal)
  const productSuccess = useSelector(state => state.products.success)
  const detailsSuccess = useSelector(state => state.details.success)
  const scrollBottom = () => {
    window.scrollTo(0, 500);
  }
  const [videoLoaded, setVideoLoaded] = useState(false)
  const detailsReal = useSelector(state => state.details.detailsReal)
  const videoRef = useRef(document.createElement('video'));
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetDetailsAsync())
    dispatch(GetAllProducts())
    if (videoRef.current != null) {
      videoRef.current.preload = 'auto';
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      videoRef.current.src = detailsReal.homeVideo;
      videoRef.current.autoplay = true;
      videoRef.current.type = 'video/webm';
      videoRef.current.onloadeddata = () => {
        videoRef.current.play();
        setVideoLoaded(true);
      }
    }
  }, [dispatch, videoRef, detailsSuccess])
  return (
    < >
      <TopBar page="home-style" />
      {
        videoLoaded &&
        <div className="modely-aksesories-cover">
          <div id='home-model-y-content' className='home-content' >
            <div className="home-content-text">
              <span className="home-content-title">{details.homeTitle}</span>
              <span className="home-content-subtitle">
                {details.homeSubTitle}
              </span>
            </div>
            <div className="home-links">
              <button style={{ border: "none" }} onClick={scrollBottom} className='buy-now-home-btn color2' >Review Products</button>
              <a href={detailsReal.markerurl} className='buy-now-home-btn color1' >Buy Now</a>
            </div>
          </div>
          <video
            ref={videoRef}
            onLoadedData={() => {
              setVideoLoaded(true);
              videoRef.current.play();
            }}
            preload={'auto'}
            className='modely-aksesories-video'
            loop
            muted
            autoPlay
            type={'video/mp4'}
          >
            <source src={details.homeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div >
      }
      {
        videoLoaded && productSuccess ? <Products /> : <div className='loading'>
          <img src={require("../assets/icons/loading.gif")} alt="loading..." />
        </div>

      }
      {
        videoLoaded &&
        <div className="modely-aksesories-cover">
          <div id='home-model-y-content' className="home-content" >
            <div className="home-content-text">
              <span className="home-content-title">{details.homeTitle}</span>
              <span className="home-content-subtitle">
                {details.homeSubTitle}
              </span>
            </div>
            <div className="home-links">
              <a href={detailsReal.markerurl} className='buy-now-home-btn color1' >Buy Now</a>
            </div>
          </div>
          <video ref={videoRef} preload="auto" className='modely-aksesories-video' autoPlay muted loop>
            <source src={details.homeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div >
      }
         {
        videoLoaded && productSuccess && <Footer />

      }
      
    </>
  )
}

export default Home