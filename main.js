const registerServiceWorker=()=>{
  return navigator.serviceWorker.register('service-worker.js')
    .then(registration=>{
      console.log('Registrasi service worker berhasil.');
      return registration;
  }).catch(err=>{
    console.log('Registrasi service worker gagal', err);
  })
}

const requestPermission=()=>{
  Notification.requestPermission().then(result=>{
    if (result === "danied") {
      console.log("fitur notifikasi tidak diijinkan");
      return;
    } else if(result==="default"){
      console.error("Pengguna menutup kotak dialog permintaan ijin");
      return;
    }
    
    
    if (('PushManager' in window)) {
      navigator.serviceWorker.getRegistration().then(registration=>{
        registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array("BG_3FWiTpDFTtoPVkCezj6bEpg-8k6ydM5qjq6AXmwUtmLqEC55pMVUeEIhfhtMkCxVYRnCLkpeEMAXA4CJAEP0")
        }).then(subscribe=>{
          console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
          console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
            null, new Uint8Array(subscribe.getKey('p256dh')))));
          console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
            null, new Uint8Array(subscribe.getKey('auth')))));
        }).catch(e=>{
          console.error('Tidak dapat melakukan subscribe ', e.message);
        })
      })
    }
  })
}

if (!("serviceWorker" in navigator) && !("Notification" in window)) {
  console.log('service worker tidak didukung browser ini.');
}else {
 registerServiceWorker();
 requestPermission();
}

function showNotifikasiSimpan(club) {
  const title = 'Serie A Update';
  const options = {
      'body': club.name +' disimpan dari daftar favorite',
  }
  if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(title, options);
      });
  } else {
      console.error('FItur notifikasi tidak diijinkan.');
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
