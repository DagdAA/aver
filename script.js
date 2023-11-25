
  const m3uData = `#EXTM3U
#EXTINF:-1,Cartoon Network
https://playout.cdn.cartoonnetwork.com.br/playout_06/playlist.m3u8
#EXTINF:-1,Cartoon Network 2
https://playout.cdn.cartoonnetwork.com.br/playout_02/playlist.m3u8
#EXTINF:-1,Cartoon Network 4
https://playout.cdn.cartoonnetwork.com.br/playout_04/playlist.m3u8
#EXTINF:-1,Cartoon Network 8
https://playout.cdn.cartoonnetwork.com.br/playout_08/playlist.m3u8`;

const channelList = document.getElementById('channel-list');
let hls = null;
const player = document.getElementById('player');

function playChannel(url) {
  if (hls) {
    hls.destroy();
  }
  hls = new Hls();
  hls.loadSource(url);
  hls.attachMedia(player);
  hls.on(Hls.Events.MANIFEST_PARSED, () => {
    player.play();
  });
}

const lines = m3uData.split('\n');
lines.forEach((line, index) => {
  if (line.startsWith('#EXTINF')) {
    const channelName = line.split(',')[1];
    const channelUrl = lines[index + 1];
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <a href="#" onclick="playChannel('${channelUrl}')">${channelName}</a>
    `;
    channelList.appendChild(listItem);
  }
});

function searchChannels() {
  const input = document.getElementById('channel-search').value.toLowerCase();
  const list = document.getElementById('channel-list');
  const items = list.getElementsByTagName('li');
  Array.from(items).forEach(item => {
    const channelName = item.textContent.toLowerCase();
    if (channelName.includes(input)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

