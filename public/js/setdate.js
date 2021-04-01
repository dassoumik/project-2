const createDate = async (e) => {
 (e).preventDefault();
    // const date = $('.sel-date').attribute().trim();
    const date = document.querySelector('.sel-date').getAttribute('data-date');
    const time = document.querySelector('.sel-time').getAttribute('data-time');
    const location = document.querySelector('.sel-location').getAttribute('data-location');
    const participant1_id = document.querySelector('.sel-owner').getAttribute('data-owner-id');
    const dog1_id = document.querySelector('.sel-dog').getAttribute('data-dog-id');
    const dog2_name = document.querySelector('.dog2-name').value.trim();
    const datelist_id = document.querySelector('.dog2-name').getAttribute('data-list-id');
    const user_id = document.querySelector('.set-date').getAttribute('data-user-id');
    
    console.log(JSON.stringify({ date, time, location, participant1_id, dog1_id, user_id, datelist_id }));

  if (date && time && location && participant1_id && dog1_id && dog2_name && user_id && datelist_id) {
    const response = await fetch('/api/puppydates/setdate', {
      method: 'POST',
      body: JSON.stringify({ date, time, location, participant1_id, dog1_id, dog2_name, user_id, datelist_id }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
    // document.location.replace('/api/puppydates/search/list');
    $('.listed').removeClass('d-none');
    $('.wrong').addClass('d-none');
    } else {
    //   alert(response.statusText);
    $('.wrong').removeClass('d-none');
    $('.listed').addClass('d-none');
    }
  };
};



$('.set-date').on('click', createDate);