
function base64Decode(base64) {
  const standardBase64 = base64.replace(/-/g, '+').replace(/_/g, '/');
  const decoded = atob(standardBase64);
  return JSON.parse(decoded);
}

// Function to verify payment and update status
async function verifyPaymentAndUpdateStatus(decodedToken) {
  try {
    const response = await fetch('http://localhost:3000/payment-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id: decodedToken.transaction_uuid }),
    });

    console.log('response', response);

    if (response.status === 200) {
      localStorage.clear();
      document.getElementById('loading').style.display = 'none';
      document.getElementById('success').style.display = 'block';
    } else {
      throw new Error('Payment verification failed');
    }
  } catch (error) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
    console.error('Error initiating payment:', error);
  }
}

function init() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(window.location.search);
  console.log('urlParams', urlParams);
  const token = urlParams.get('data');
  console.log('token', token);

  if (token) {
    const decodedToken = base64Decode(token);
    console.log('decodedToken', decodedToken);
    verifyPaymentAndUpdateStatus(decodedToken);
  } else {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
  }
}

// Run the main function when the page loads
window.onload = init;
