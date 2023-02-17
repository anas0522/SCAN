import { Linking } from 'react-native'


const sendWhatsApp = (msg, phoneWithCountryCode, phoneWithCountryCode1) => {
    let mobile = Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
    let mobile1 = Platform.OS == 'ios' ? phoneWithCountryCode1 : '+' + phoneWithCountryCode1;
    if (mobile) {
        if (msg) {
            let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
            let url1 = 'whatsapp://send?text=' + msg + '&phone=' + mobile1;
            setTimeout(() => {
                Linking.openURL(url1).then((data) => {
                }).catch(() => {
                    alert('Make sure WhatsApp installed on your device');
                })
            }, 1000)
            Linking.openURL(url).then((data) => {
                console.log('WhatsApp Opened');
            }).catch(() => {
                alert('Make sure WhatsApp installed on your device');
            });
        } else {
            alert('Please insert message to send');
        }
    } else {
        alert('Please insert mobile no');
    }
}
export default sendWhatsApp;