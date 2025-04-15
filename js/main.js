// This script handles the donation form submission and displays the donation history.
document.getElementById('donate-form')?.addEventListener('submit', function (event) {
  event.preventDefault();
  const cause = document.getElementById('cause').value;
  const amount = document.getElementById('amount').value;
  const donorName = document.getElementById('donorName').value;
  const donorEmail = document.getElementById('donorEmail').value;

  const donationDetails = {
    date: new Date().toLocaleDateString(),
    cause,
    amount,
    donorName,
    donorEmail,
  };

  const donations = JSON.parse(localStorage.getItem('donations') || '[]');
  donations.push(donationDetails);
  localStorage.setItem('donations', JSON.stringify(donations));

  alert(`Thank you ${donorName}! You donated $${amount} to ${cause}.`);
  window.location.href = 'donations.html';
});

function displayDonationHistory() {
  const table = document.getElementById('donationTableBody');
  if (!table) return;

  const donations = JSON.parse(localStorage.getItem('donations') || '[]');
  table.innerHTML = '';
  donations.forEach(({ date, donorName, donorEmail, cause, amount }) => {
    table.innerHTML += `
      <tr>
        <td class="px-4 py-2">${date}</td>
        <td class="px-4 py-2">${donorName}</td>
        <td class="px-4 py-2">${donorEmail}</td>
        <td class="px-4 py-2">${cause}</td>
        <td class="px-4 py-2">$${amount}</td>
      </tr>
    `;
  });
}

if (window.location.pathname.includes('donations.html')) displayDonationHistory();
