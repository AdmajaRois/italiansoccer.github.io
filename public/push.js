var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BG_3FWiTpDFTtoPVkCezj6bEpg-8k6ydM5qjq6AXmwUtmLqEC55pMVUeEIhfhtMkCxVYRnCLkpeEMAXA4CJAEP0",
    "privateKey": "_He2PjGrD1O7LXw57bhsun21nffLhfvEwLC_6r7ZMyk"
};

webPush.setVapidDetails(
    'mailto: example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "  https://fcm.googleapis.com/fcm/send/cFPUk8F2lI8:APA91bGdNvWOG9hud6zf1XV47RFPwFOzwBeACinExN7GoRIA6Y3Qok_xDIcX5n_zKY4AsD8zsdrU89k81Fj28EH0Mw0Vt0P0PqvhP3BQSEVx1r4sWDWrI8P8hbKN1yh5u30WhAfr0u44",
    "keys": {
        "p256dh":"BHp6r6Wgz/9JjZBBFMjXudEMoDoannE2xBK/OOggcLuERwjQ+7i0pHpWBi1PqJ3sqejlDns8Mj5UQdR87KsuACc=",
        "auth": "QQzXSqOn6Gslr+oqLWIyHA=="
    }
};

var payload = 'Selamat! aplikasi sudah menerima push notif';

var options = {
    gcmAPIKey: '501217249826',
    TTL:60
}


webPush.sendNotification(
    pushSubscription,
    payload,
    options
)

