const createDate = async (e) => {
    if (e.target.hasAttribute('data-set-id')) {
        (e).preventDefault();
        const id = e.target.getAttribute('data-set-id');
        const date = document.querySelector(`.sel-date${id}`).getAttribute('data-date');
        const time = document.querySelector(`.sel-time${id}`).getAttribute('data-time');
        const location = document.querySelector(`.sel-location${id}`).getAttribute('data-location');
        const participant1_id = document.querySelector(`.sel-owner${id}`).getAttribute('data-owner-id');
        const dog1_id = document.querySelector(`.sel-dog${id}`).getAttribute('data-dog-id');
        const zip = document.querySelector(`.sel-zip${id}`).getAttribute('data-zip');
        const dog2_name = document.querySelector(`.dog2-name${id}`).value.trim();
        const datelist_id = document.querySelector(`.dog2-name${id}`).getAttribute('data-list-id');
        const user_id = document.querySelector('.header-confirm').getAttribute('data-user-id');

        console.log(JSON.stringify({
            date,
            time,
            location,
            participant1_id,
            dog1_id,
            user_id,
            datelist_id
        }));

        if (date && time && location && participant1_id && dog1_id && zip && dog2_name && user_id && datelist_id) {
            const response = await fetch('/api/puppydates/setdate', {
                method: 'POST',
                body: JSON.stringify({
                    date,
                    time,
                    location,
                    participant1_id,
                    dog1_id,
                    zip,
                    dog2_name,
                    user_id,
                    datelist_id
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                $('.listed').removeClass('d-none');
                $('.wrong').addClass('d-none');
            } else {
                $('.wrong').removeClass('d-none');
                $('.listed').addClass('d-none');
            }
        };
    };
};


$(document).on('click', createDate);