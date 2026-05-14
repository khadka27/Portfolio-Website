// Node 18+ has native fetch
async function testFeed() {
    const username = 'khadka27';
    // Try both RSS2JSON and direct Medium feed (though direct might fail CORS/headers in browser, it might work in node or show redirect)
    const url = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`;
    console.log('Fetching:', url);
    try {
        const res = await fetch(url);
        console.log('Status:', res.status);
        const data = await res.json();
        console.log('Data Status:', data.status);
        console.log('Items count:', data.items ? data.items.length : 0);
        if (data.items && data.items.length > 0) {
            console.log('First item keys:', Object.keys(data.items[0]));
            console.log('First item title:', data.items[0].title);
            console.log('First item thumbnail:', data.items[0].thumbnail);
        } else {
            console.log('Full data:', JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error('Error:', e);
    }
}

testFeed();
