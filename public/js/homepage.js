document.addEventListener('DOMContentLoaded', () => {
    const adForm = document.getElementById('createAdForm');
    const adsList = document.getElementById('ads');

    adForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(adForm);
        const title = formData.get('title');
        const description = formData.get('description');
        
        try {
            const response = await fetch('/ads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            });
            
            if (!response.ok) {
                throw new Error('Failed to create ad');
            }

            const ad = await response.json();
            appendAd(ad);
            adForm.reset();
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

    async function fetchAds() {
        try {
            const response = await fetch('/ads');
            if (!response.ok) {
                throw new Error('Failed to fetch ads');
            }
            const ads = await response.json();
            ads.forEach(appendAd);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    function appendAd(ad) {
        const li = document.createElement('li');
        li.textContent = `${ad.title}: ${ad.description}`;
        adsList.appendChild(li);
    }

    fetchAds();
});
