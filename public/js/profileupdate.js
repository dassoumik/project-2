const submitProfile = async (e) => {
  (e).preventDefault();
  const name = document.querySelector('.your-name').value.trim();
  const age = document.querySelector('.your-age').value.trim();
  const city = document.querySelector('.your-city').value.trim();
  const state = document.querySelector('.your-state').value.trim();
  const zip = document.querySelector('.your-zip').value.trim();
  const dob = document.querySelector('.your-dob').value.trim();
  const gender = document.querySelector('.your-gender').value.trim();
  const image = document.querySelector('.your-image').value.trim();
  const user_id = document.querySelector('.profile-submit').getAttribute('data-id');
  console.log(JSON.stringify({
    name,
    age,
    city,
    state,
    zip,
    dob,
    gender,
    image,
    user_id
  }));

  if (name && age && dob && gender && city && state && zip && user_id) {
    const response = await fetch('/api/owners/profile/add', {
      method: 'POST',
      body: JSON.stringify({
        name,
        age,
        city,
        state,
        zip,
        dob,
        gender,
        image,
        user_id
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      $('.listed').removeClass('d-none');
      $('.wrong').addClass('d-none');
      $('.create-dog').removeClass('d-none');
      $('.profile-submit').addClass('d-none');
    } else {
      $('.wrong').removeClass('d-none');
      $('.listed').addClass('d-none');
      $('.create-dog').addClass('d-none');
      $('.profile-submit').removeClass('d-none');
    }
  };
};

const addDog = async (e) => {
  (e).preventDefault();
  document.location.replace('/api/dogs/profile/add');
}

$('.profile-submit').on('click', submitProfile);
$('.create-dog').on('click', addDog);