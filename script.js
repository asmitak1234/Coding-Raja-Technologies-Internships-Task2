
// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let random_track=document.querySelector(".random-track");

let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let repeatIcon = document.querySelector('.fa-sync');
// Specify globally used values
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat=false;
let updateTimer;
 
// Create the audio element for the player
let curr_track = document.createElement('audio');
 
// Define the list of tracks that have to be played
let track_list = [
    {
        image : 'maahi.jpg',
        name : 'O Maahi',
        artist : 'Arijit Singh',
        path : 'O Mahi O Mahi_320(PagalWorld.com.sb).mp3'
    },
    {
        image : 'terijhukinazar.jpg',
        name : 'Teri Jhuki Nazar',
        artist : 'Shafqat Amanat Ali',
        path : '05. Teri Jhuki Nazar (Film Version).mp3'
    },
    {
        image: 'soniya.jpg',
        name : 'You Are My Sonia',
        artist : 'Alka Yagnik, Sonu Nigam',
        path: '03. You Are My Sonia.mp3'
    },
    {
        image : 'heeriye.png',
        name : 'Heeriye',
        artist : 'Arijit Singh ,Jasleen Royal',
        path : 'Heeriye Heeriye Aa_320(PaglaSongs).mp3'
    },
    {
        image: 'haanji.png',
        name : 'Haanji',
        artist : 'ARAN,The Ris',
        path : 'Haanji_320(PagalWorldl).mp3'
    }
];

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage = 
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = 
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    
    // Apply a random background color
    random_bg_color();
    }
    
    // function random_bg_color() {
    // // Get a random number between 64 to 256
    // // (for getting lighter colors)
    // let red = Math.floor(Math.random() * 256) + 64;
    // let green = Math.floor(Math.random() * 256) + 64;
    // let blue = Math.floor(Math.random() * 256) + 64;
    
    // // Construct a color with the given values
    // let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    // // Set the background to the new color
    // document.body.style.background = bgColor;
    // }
    function random_bg_color(){
        let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
        let a;
    
        function populate(a){
            for(let i=0; i<6; i++){
                let x = Math.round(Math.random() * 14);
                let y = hex[x];
                a += y;
            }
            return a;
        }
        let Color1 = populate('#');
        let Color2 = populate('#');
        var angle = 'to right';
    
        let gradient = 'linear-gradient('+ angle + ',' + Color1 + ',' + Color2 + ')';
        document.body.style.background = gradient;
    }
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        // Play the loaded track
        curr_track.play();
        isPlaying = true;
        track_art.classList.add('rotate');
         wave.classList.add('loader');
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        // Pause the loaded track
        curr_track.pause();
        isPlaying = false;
        track_art.classList.remove('rotate');
        wave.classList.remove('loader');
        // Replace icon with the play icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        
        function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (track_index > 0 )
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }

        function nextTrack() {
            if (isRandom) {
                // Generate a random index within the range of shuffled track_list
                const randomIndex = Math.floor(Math.random() * track_list.length);
                track_index = randomIndex;
                // Load and play the new track
                loadTrack(track_index);
                playTrack();
            } else {
                if (track_index < track_list.length - 1 && !isRepeat)
                    track_index += 1;
                else if(track_index<track_list.length-1 && isRepeat)
                    track_index=track_index;
                else track_index = 0;
                
                // Load and play the new track
                loadTrack(track_index);
                playTrack();
            }
        }
        
        // function playRandomTrack() {
        //     if (!isRandom) {
        //         shufflePlaylist(); // Shuffle the playlist
        //         isRandom = true; // Set random mode to true
        //         randomIcon.classList.remove('unactive');
        //         randomIcon.classList.add('active');
        //         // Load and play the first track of the shuffled playlist
        //         loadTrack(0);
        //         playTrack();
        //     } else {
        //         isRandom = false;
        //         randomIcon.classList.remove('active');
        //         randomIcon.classList.add('unactive');
        //     }
        // }
        
        // function shufflePlaylist() {
        //     for (let i = track_list.length - 1; i > 0; i--) {
        //         const j = Math.floor(Math.random() * (i + 1));
        //         [track_list[i], track_list[j]] = [track_list[j], track_list[i]]; // Swap elements
        //     }
        // }


        function shufflePlaylist(reset = false) {
            if (reset) {
                // Reset to the original order
                track_list = [
                    {
                        image : 'jhukinazar.png',
                        name : 'Teri Jhuki Nazar',
                        artist : 'Shafqat Amanat Ali',
                        path : '05. Teri Jhuki Nazar (Film Version).mp3'
                    },
                    {
                        image: 'soniya.png',
                        name : 'You Are My Sonia',
                        artist : 'Alka Yagnik, Sonu Nigam',
                        path: '03. You Are My Sonia.mp3'
                    },
                    {
                        image : 'heeriye.png',
                        name : 'Heeriye',
                        artist : 'Arijit Singh ,Jasleen Royal',
                        path : 'Heeriye Heeriye Aa_320(PaglaSongs).mp3'
                    },
                    {
                        image: 'haanji.png',
                        name : 'Haanji',
                        artist : 'ARAN,The Ris',
                        path : 'Haanji_320(PagalWorldl).mp3'
                    }
                ];
            } else {
                // Shuffle the playlist
                for (let i = track_list.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [track_list[i], track_list[j]] = [track_list[j], track_list[i]]; // Swap elements
                }
            }
        }
        
        function playRandomTrack() {
            if (!isRandom) {
                shufflePlaylist(); // Shuffle the playlist
                isRandom = true; // Set random mode to true
                randomIcon.classList.remove('unactive');
                randomIcon.classList.add('active');
                // Load and play the first track of the shuffled playlist
                loadTrack(0);
                playTrack();
            } else {
                isRandom = false;
                randomIcon.classList.remove('active');
                randomIcon.classList.add('unactive');
                shufflePlaylist(true); // Reset to original order
            }
        }
        

        function repeatTrack(){
            isRepeat ? pauseRepeat() : playRepeat();
        }

        function pauseRepeat()
        {
            isRepeat=false;
            let current_index = track_index;
            repeatIcon.classList.remove('active');
            repeatIcon.classList.add('unactive');
            
            loadTrack(current_index);
            playTrack();
        }

        function playRepeat()
        {
             isRepeat=true;
            let current_index = track_index;
            repeatIcon.classList.remove('unactive');
            repeatIcon.classList.add('active');
            
            loadTrack(current_index);
            playTrack();
        }
         
        function seekTo() {
            // Calculate the seek position by the
            // percentage of the seek slider 
            // and get the relative duration to the track
             let seekto = curr_track.duration * (seek_slider.value / 100);
            
            // Set the current track position to the calculated seek position
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            // Set the volume according to the
            // percentage of the volume slider set
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            // Check if the current track duration is a legible number
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                // Calculate the time left and the total duration
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                // Add a zero to the single digit time values
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                // Display the updated duration
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
// Load the first track in the tracklist
loadTrack(track_index);

function addnewtrack()
{
    let addtrackparent=document.getElementById("addtrackp");
    addtrackparent.style.display="block";
    addtrackparent.style.display="flex";
    window.alert("Do Not Refresh After Adding Albums!! It will Erase the Added albums.");
}
                        
const addTrackForm = document.getElementById('addTrackForm');
addTrackForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const imageFile = document.getElementById('imageFile').files[0];
    const audioFile = document.getElementById('audioFile').files[0];
    const trackName = document.getElementById('trackName').value;
    const artist = document.getElementById('artist').value;

    // Optionally, you can perform validation on the selected files

    // Read the selected image and audio files
    const imageReader = new FileReader();
    const audioReader = new FileReader();

    // Define variables to hold the URLs
    let imageURL, audioURL;

    imageReader.onload = function(event) {
        imageURL = event.target.result; // Get the base64 encoded image URL

        // Once both files are loaded, proceed with adding the track
        if (audioURL) {
            addTrack(imageURL, audioURL, trackName, artist);
        }
    };

    audioReader.onload = function(event) {
        audioURL = event.target.result; // Get the base64 encoded audio URL

        // Once both files are loaded, proceed with adding the track
        if (imageURL) {
            addTrack(imageURL, audioURL, trackName, artist);
        }
    };

    // Read the files as base64 encoded URLs
    imageReader.readAsDataURL(imageFile);
    audioReader.readAsDataURL(audioFile);

    // Function to add the track to track_list array
    function addTrack(imageURL, audioURL, trackName, artist) {
        // Create new track object
        const newTrack = {
            image: imageURL,
            name: trackName,
            artist: artist,
            path: audioURL
        };

        // Add new track to track_list array or do whatever you want with it
        track_list.push(newTrack);
        populateTrackList();
    }
    addTrackForm.reset();
});


// Function to populate the track list
function populateTrackList() {
    const trackListElement = document.getElementById('track-list');

    // Clear any existing items
    trackListElement.innerHTML = '';

    // Iterate through the trackList array and create list items
    track_list.forEach((track, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('track-item');

        // Construct the HTML for each track item
        listItem.innerHTML = `    
            <div>
                <h4 class="album-name">${track.name}</h4><h5 class="album-artist">${track.artist}</h5><br/>
            </div>
        `;

        listItem.addEventListener('click', function() {
            loadTrack(index); // Load and play the clicked track
            playTrack();
        });

        trackListElement.appendChild(listItem);
    });
}

// Call the function to initially populate the track list
populateTrackList();