const url = "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd";

let player;

window.addEventListener("load", async () => {
  try {
    await senza.init();

    senza.lifecycle.addEventListener("userinactivity", (event) => {
      const timeout = event.detail?.timeout ?? 30;
      console.log(`Got 'userinactivity' event with timeout of ${timeout} seconds.`);
      showMessage(timeout);
    });

    player = new senza.ShakaPlayer();
    player.configure(playerConfig());
    player.attach(video);
    await player.load(url);
    await video.play();

    senza.uiReady();
  } catch (error) {
    console.error(error);
  }
});

document.addEventListener("keydown", async function (event) {
  if (overlay.style.display === "flex") {
    hideMessage();
  }

  switch (event.key) {
    case "Enter": await toggleBackground(); break;
    case "Escape": await fakeUserInactivity(5, 30); break;
    case "ArrowUp": break;
    case "ArrowDown": break;
    case "ArrowLeft": skip(-30); break;
    case "ArrowRight": skip(30); break;
    default: return;
  }
  event.preventDefault();
});

let countdownInterval = null;
async function showMessage(seconds) {
  if (senza.lifecycle.state == senza.lifecycle.UiState.BACKGROUND) {
    await senza.lifecycle.moveToForeground();
  }
  
  let remaining = seconds;
  updateMessageText(remaining);
  overlay.style.display = "flex";

  countdownInterval = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      hideMessage();
    } else {
      updateMessageText(remaining);
    }
  }, 1000);
}

function updateMessageText(remaining) {
  message.innerHTML = `<b>Are you still there?</b><br><br>Press any button in<br>the next ${remaining} seconds<br>to keep watching.`;
}

function hideMessage() {
  overlay.style.display = "none";
  clearInterval(countdownInterval);
}

function fakeUserInactivity(delay = 5, timeout = 30) {
  console.log(`Will send fake 'userinactivity' event in ${delay} seconds.`);
  setTimeout(() => {
    console.log("Sending fake 'userinactivity' event.");
    senza.lifecycle.dispatchEvent(new CustomEvent("userinactivity", {detail: {timeout}}));
  }, delay * 1000);
}

async function toggleBackground() {
  if (senza.lifecycle.state == senza.lifecycle.UiState.BACKGROUND) {
    await senza.lifecycle.moveToForeground();
  } else {
    await senza.lifecycle.moveToBackground();
  }
}

async function playPause() {
  if (video.paused) {
    await video.play();
  } else {
    await video.pause();
  }
}

function skip(seconds) {
  video.currentTime = video.currentTime + seconds;
}

function playerConfig() {
  return {abr: {restrictions: {maxHeight: 1080}}};
}
