import React from "react";
import './Modal.css';
import Embed from "../embed";
import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, TelegramShareButton, TelegramIcon, WhatsappShareButton, WhatsappIcon} from "react-share";


function Modal(props) {
  const { show, closeModal } = props;
  console.log(window.location.href);

  const myComponentStyle = {
    padding: '0 30px 0 0'
  }

  return (
    <>
      <div className={show ? "modal" : "hide"}>
        <button onClick={closeModal} style={myComponentStyle}>X</button>
        <h4  style= {{ margin: '10px 0'}}>Share with others</h4>
        <div class="">
          <div className="sosShare">
            <FacebookShareButton 
              url={'https://www.facebook.com/sharer/sharer.php?http://localhost:3000/NewPlayer/62dfa243dff516703b66771f'}
              className="styleFb" >
              <FacebookIcon size={120} round={true} />
            </FacebookShareButton>
          </div>
          <div className="">
          <TwitterShareButton 
            url={window.location.href}
            className="styleTw" >
            <TwitterIcon size={120} round={true} />
        </TwitterShareButton>
          </div>
          <div className="">
          <TelegramShareButton 
            url={window.location.href}
            className="styleTele"
            >
            <TelegramIcon size={120} round={true} />
        </TelegramShareButton>
          </div>
          <div className="">
          <WhatsappShareButton 
            url={window.location.href}
            className="styleWa">
            <WhatsappIcon size={120} round={true} />
        </WhatsappShareButton>
          </div>
        </div>
        {/* <Divider /> */}
        <h4 className="mbedLink">Embed Link</h4>
        <Embed />
      </div>
    </>
  );
}

export default Modal;
