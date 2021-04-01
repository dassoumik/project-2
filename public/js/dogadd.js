const addDog = async (e) => {
    (e).preventDefault();
    console.log("in add dog");
    const name = document.querySelector('.dog-name').value.trim();
    const breed = document.querySelector('.dog-breed').value.trim();
    const age = document.querySelector('.dog-age').value.trim();
    const gender = document.querySelector('.dog-gender').value.trim();
    const image = document.querySelector('.dog-image').value.trim();
    const user_id = document.querySelector('.dog-profile-submit').getAttribute('data-id');

  if (name && breed && age && gender && image && user_id) {
    const response = await fetch('/api/dogs/create/new/profile', {
      method: 'POST',
      body: JSON.stringify({name, breed, age, gender, image, user_id}),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
    //   document.location.replace('/profile');
    $('.listed').removeClass('d-none');
    $('.wrong').addClass('d-none');
    $('.create-dog').removeClass('d-none');
    $('.profile-submit').addClass('d-none');
    } else {
    //   alert(response.statusText);
    $('.wrong').removeClass('d-none');
    $('.listed').addClass('d-none');
    $('.create-dog').addClass('d-none');
    $('.profile-submit').removeClass('d-none');
    }
  };
};

// const addDog = async (e) => {
//   (e).preventDefault();
//   document.location.replace('/api/dogs/profile/add');
// }

$('.dog-profile-submit').on('click', addDog);