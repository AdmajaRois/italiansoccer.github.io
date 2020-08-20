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
    "endpoint": " https://fcm.googleapis.com/fcm/send/fSZslIqHfr0:APA91bHnnSWp8PGm3kZuDCoSir5Rpv7wF4wEmt_fPW4w8ji6tRahqtUyQiHTSJTR_8x_EMAFR2_enjXYe0y7fo3VNl_bhg0uMdLd8BbmQX4O1DkMilLM3Gl2qsOcaat9aDBeXTMl5xC7",
    "keys": {
        "p256dh":"BHSjmZO2wXDPR8Rb4V3PgTfZ/ElVQ7hcvtRnKVl059F+/tZ7PqBGpUJZjp4JrCD35MzgHZTdB3J9l6Wxxhc3HxE=",
        "auth": "SqcDdwngfZ0qoiRcSehQlQ=="
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

