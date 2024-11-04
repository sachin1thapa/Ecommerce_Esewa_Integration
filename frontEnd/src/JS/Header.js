const Header = `
  <header class="section-navabar">
    <section class="head-top">
      <div class="head container">
        <div class="head-text">
          <p>Free Shipping 30 day free refund policy </p>
        </div>
        <div class="sign_up_log_in">
          <a href="./src/HTML/loginForm.html">log_in</a>
          <!-- <a href="#">sign_up</a> -->
        </div>
      </div>
    </section>

    <div class="head-below">
      <div class="brand-logo">
        <!-- <img src=". /images/logo.png" alt="logo" height="auto" width="%"> -->
        logo

      </div>

      <div class="navbar">
        <li class="nav-items">
          <a href="../../index.html">Home</a>
        </li>
        <li class="nav-items">
          <a href="./about.html">About</a>
        </li>
        <li class="nav-items">
          <a href="./product.html">Product</a>
        </li>

        <li class="nav-items">
          <a href="./contactme.html">Contact</a>
        </li>
        <li class="nav-items">
          <a href="./cart.html" id="navbar-count">
            <i class="fa-solid fa-cart-shopping"></i> 0
          </a>
        </li>

      </div>

    </div>

  </header>
`;

document.querySelector('.Header').insertAdjacentHTML('beforeend', Header);
