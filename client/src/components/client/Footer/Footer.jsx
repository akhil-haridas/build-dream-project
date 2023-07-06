import React from 'react'

import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div id="footer-section" class="text-center">
        <div class="sm:w-[90%]">
          <div class="row flex justify-center">
            <div class="w-[94%] sm:ml-[30px]">
              <ul class="footer-social-links">
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Dribbble</a>
                </li>
                <li>
                  <a href="#">Behance</a>
                </li>
                <li>
                  <a href="#">Pinterest</a>
                </li>
              </ul>
              <p class="copyright">
                &copy; 2023 Build Dream Construction Guide - COMMUNITY
                <a href="https://github.com/akhil-haridas">🌐</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer