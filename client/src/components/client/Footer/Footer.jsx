import React from 'react'

import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container mx-auto sm:px-4">
        <div className="flex flex-wrap ">
          <div className="lg:w-1/3 pl-[6rem] md:w-1/2 pl-4 sm:w-3/5 pl-[8rem]">
            <div className="footer__about">
              <div className="footer__logo">
                <a href="/">
                  <img src="/images/LogoBlack.png" alt="" />
                </a>
              </div>
              <p>
                "Welcome to our Home Construction Guide, your comprehensive
                online resource for all things related to building your dream
                home."
              </p>
              <div className="footer__payment">
                <a href="/">
                  <img src="/images/img_image_indigo_500.svg" alt="" />
                </a>
                <a href="/">
                  <img src="/images/img_image_pink_400.svg" alt="" />
                </a>
                <a href="/">
                  <img src="/images/img_image_red_800.svg" alt="" />
                </a>
                <a href="/">
                  <img src="/images/img_youtube.svg" alt="" />
                </a>
                <a href="/">
                  <img src="/images/img_image_light_blue_700.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="lg:w-1/5 ml-[-630px] mt-[75px] pr-[4rem] pl-[5rem] md:w-1/4 pr-4 pl-4 sm:w-2/5 pr-4 pl-4">
            <div className="footer__widget">
              <h6>Quick links</h6>
              <ul>
                <li>
                  <a href="/shop">Shop</a>
                </li>
                <li>
                  <a href="/cart">Professional</a>
                </li>
                <li>
                  <a href="/contact">Magazine</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/5 pr-[3rem] pl-4 mt-[75px] md:w-1/4 pr-4 pl-4 sm:w-1/3 pr-4 pl-4">
            <div className="footer__widget">
              <h6>Account</h6>
              <ul>
                <li>
                  <a href="/profile">My Account</a>
                </li>
                <li>
                  <a href="/orders">Chat</a>
                </li>
                <li>
                  <a href="wishlist">Notification</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/3 pr-4 mt-[75px] pl-4 md:w-2/3 pl-[3rem] sm:w-2/3">
            <div className="footer__newslatter">
              <h6>NEWSLETTER</h6>
              <form action="#">
                <input type="text" placeholder="Email" />
                <button className="site-btn">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer