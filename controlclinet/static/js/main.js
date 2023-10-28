async function main() {
    try {
        const location = await getGeolocation();
        const userAgent = checkUserAgent();
        const operatingSystem = getOperatingSystem();
        const languages = getSupportedLanguages();
        const deviceType = detectDeviceType();
        const orientationInfo = getOrientationInfo();
        const ipInfo = await getIpInfo();
        const memory = getMemorySize();
        const browserVersion = getBrowserVersion();
        const screenResolution = getResolution();


        const data = {
            location,
            userAgent,
            operatingSystem,
            languages,
            deviceType,
            orientationInfo,
            ipInfo,
            memory,
            browserVersion,
            screenResolution,
        };

        const response = await sendDataToServer(data);
        if (response.ok) {
            console.log('Data sent to the server');
        } else {
            console.error('Failed to send data to the server');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function sendDataToServer(data) {
    const response = await fetch('/browserdata/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response;
}

async function getGeolocation() {
    return new Promise((resolve, reject) => {
        $.get('https://ipinfo.io', function (response) {
            resolve({
                city: response.city,
                region: response.region,
                country: response.country,
                timeZone: response.timezone,
            });
        }, 'json');
    });
}

// Function to check user agent
function checkUserAgent() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) {
        return 'Chrome Browser';
    } else if (userAgent.includes('Firefox')) {
        return 'Firefox browser.';
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) {
        return 'Internet Explorer.';
    } else if (userAgent.includes('Edge')) {
        return 'Microsoft Edge.';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        return 'It is a Safari browser.';
    } else {
        return 'different browser.';
    }
}

// Function to get the operating system
function getOperatingSystem() {
    const userAgent = navigator.userAgent;
    let operatingSystem = 'Unknown';

    if (userAgent.includes('Windows NT 10.0')) {
        operatingSystem = 'Windows 10';
    } else if (userAgent.includes('Windows NT 6.3')) {
        operatingSystem = 'Windows 8.1';
    } else if (userAgent.includes('Windows NT 6.2')) {
        operatingSystem = 'Windows 8';
    } else if (userAgent.includes('Windows NT 6.1')) {
        operatingSystem = 'Windows 7';
    } else if (userAgent.includes('Windows NT 6.0')) {
        operatingSystem = 'Windows Vista';
    } else if (userAgent.includes('Windows NT 5.1')) {
        operatingSystem = 'Windows XP';
    } else if (userAgent.includes('Windows NT 5.0')) {
        operatingSystem = 'Windows 2000';
    } else if (userAgent.includes('Macintosh')) {
        operatingSystem = 'Mac OS';
    } else if (userAgent.includes('Linux')) {
        operatingSystem = 'Linux';
    }
    return operatingSystem;
}

// Function to get supported languages
function getSupportedLanguages() {
    return navigator.languages;
}

// Function to detect the device type
function detectDeviceType() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ? 'Mobile'
        : 'Desktop';
}

// Function to get orientation information
function getOrientationInfo() {
    return screen.height > screen.width ? 'It is in Landscape mode' : 'It is in portrait mode';
}

// Function to get IP information
async function getIpInfo() {
    return new Promise((resolve, reject) => {
        $.get('https://ipinfo.io', function (response) {
            resolve({
                ip: response.ip,
                organization: response.org,
            });
        }, 'json');
    });
}

// Function to get device memory size
function getMemorySize() {
    return navigator.deviceMemory;
}

// Function to get browser version
function getBrowserVersion() {
    const userAgent = navigator.appVersion;
    let browserVersion = 'Version not found';

    if (userAgent.includes('Chrome')) {
        browserVersion = userAgent.split('Chrome/')[1].split(' ')[0];
    } else if (userAgent.includes('Firefox')) {
        browserVersion = userAgent.split('Firefox/')[1];
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) {
        browserVersion = userAgent.split('MSIE ')[1].split(';')[0];
    } else if (userAgent.includes('Edge')) {
        browserVersion = userAgent.split('Edge/')[1];
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        browserVersion = userAgent.split('Version/')[1];
    }

    return browserVersion;
}

function getResolution() {
    const height = screen.width;
    const width = screen.height;
    return height + 'X' + width;
}

document.addEventListener('DOMContentLoaded', main);
