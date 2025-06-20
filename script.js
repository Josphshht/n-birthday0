document.addEventListener('DOMContentLoaded', () => {
    const mediaDisplay = document.getElementById('media-display');

    // IMPORTANT: Set your friend's birthday month and day here (MM-DD format)
    const BIRTHDAY_MONTH_DAY = '07-25'; // Example: July 25th

    const today = new Date();
    const currentMonthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    if (currentMonthDay === BIRTHDAY_MONTH_DAY) {
        // It's the birthday! Play the video.
        const video = document.createElement('video');
        video.id = 'birthday-video';
        video.src = 'video/birthday.mp4';
        video.autoplay = true;
        video.loop = false; // Play once
        video.muted = true; // Start muted to allow autoplay without user interaction in some browsers
        video.playsInline = true; // Important for iOS autoplay

        video.addEventListener('ended', () => {
            // Optional: You could add a fallback message or transition here.
            // For now, it just stops on the last frame.
        });

        mediaDisplay.appendChild(video);

        // Try to play the video programmatically. Muted + playsInline is usually enough.
        video.play().catch(error => {
            console.warn('Autoplay prevented. User interaction might be needed for sound.', error);
        });

    } else {
        // Not the birthday, display a random door image.
        const TOTAL_DOOR_IMAGES = 30; // Assuming door1.jpg to door30.jpg

        let selectedDoorIndex;
        const lastVisitDate = localStorage.getItem('lastVisitDate');
        const cachedDoorIndex = localStorage.getItem('cachedDoorIndex');

        // Check if it's the same day and a door was already cached
        if (lastVisitDate === currentMonthDay && cachedDoorIndex !== null) {
            selectedDoorIndex = parseInt(cachedDoorIndex, 10);
            console.log(`Displaying cached door image: door${selectedDoorIndex}.jpg`);
        } else {
            // Generate a new random index if it's a new day or no cache
            selectedDoorIndex = Math.floor(Math.random() * TOTAL_DOOR_IMAGES) + 1;
            // Cache the selected door and today's date
            localStorage.setItem('cachedDoorIndex', selectedDoorIndex);
            localStorage.setItem('lastVisitDate', currentMonthDay);
            console.log(`Displaying new random door image: door${selectedDoorIndex}.jpg`);
        }

        const image = document.createElement('img');
        image.id = 'door-image';
        image.src = `images/door${selectedDoorIndex}.jpg`;
        image.alt = 'A mysterious door';

        // Add an error handler for images just in case
        image.onerror = () => {
            console.error(`Failed to load image: images/door${selectedDoorIndex}.jpg`);
            // Optional: display a fallback message or a default image
            // image.src = 'images/default-error.jpg';
        };

        mediaDisplay.appendChild(image);
    }
});