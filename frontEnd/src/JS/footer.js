const footer = `
<footer class="section-footer">
    <div class="footer-container container">
        <div class="content_1">
            <p>
                Welcome, your ultimate destination for cutting-edge gadgets!
            </p>
            <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="Payment cards" />
        </div>
        <div class="content_2">
            <h4>SHOPPING</h4>
            <a href="#">Computer Store</a>
            <a href="#">Laptop Store</a>
            <a href="#">Accessories</a>
            <a href="#">Sales & Discounts</a>
        </div>
        <div class="content_3">
            <h4>Experience</h4>
            <a href="contactme.html">Contact Us</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Payment Method</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Delivery</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Return and Exchange</a>
        </div>
        <div class="content_4">
            <h4>NEWSLETTER</h4>
            <p>Be the first to know about new<br />arrivals, sales & promos!</p>
            <form class="f-mail" onsubmit="handleNewsletterSubscription(event)">
                <input type="email" placeholder="Your Email" aria-label="Your Email" required />
               
            </form>
            <hr />
        </div>
    </div>
</footer>
`;

// Insert the footer into the document
document.querySelector('.footer').insertAdjacentHTML('beforeend', footer);
