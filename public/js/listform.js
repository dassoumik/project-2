const submitList = async (e) => {
  (e).preventDefault();
  const name = document.querySelector('.dog-name').value.trim();
  const location = document.querySelector('.location').value.trim();
  const selectedDate = document.querySelector('.selected-date').value.trim();
  const selectedTime = document.querySelector('.selected-time').value.trim();
  const city = document.querySelector('.city').value.trim();
  const state = document.querySelector('.state').value.trim();
  const zip = document.querySelector('.zip').value.trim();
  const userID = document.querySelector('.list-submit').getAttribute('data-id');

  if (name && location && selectedDate && selectedTime && city && state && zip) {
    const response = await fetch('/api/owners/list', {
      method: 'POST',
      body: JSON.stringify({
        userID,
        name,
        selectedDate,
        selectedTime,
        city,
        state,
        location,
        zip
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      $('.listed').removeClass('d-none');
    } else {
      $('.wrong').removeClass('d-none');
    }
  };
};

$('.list-submit').on('click', submitList);