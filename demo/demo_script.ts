import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

async function runDemo() {
    console.log('--- Starting SlotSavvy Demo Plan ---');
    
    try {
        // 1. Create Parcel
        console.log('\n[1] Creating Parcel...');
        const parcelRes = await axios.post(`${API_URL}/parcels`, {
            pincode: '110001',
            weight: 2.5,
            senderId: 'user-1' // assumption: seed data exists exists or soft fail
        });
        const parcelId = parcelRes.data.id;
        console.log(` -> Parcel created: ${parcelId}`);
        
        // 2. Recommend Slots
        console.log('\n[2] Fetching Recommendations...');
        const slotsRes = await axios.get(`${API_URL}/slots/recommend`, {
            params: { pincode: '110001', date: new Date().toISOString().split('T')[0], weight: 2.5 }
        });
        console.log(` -> Recommendations: ${slotsRes.data.length} slots found.`);
        console.log(slotsRes.data.slice(0, 1));
        
        // 3. Compute Routes (Staff)
        console.log('\n[3] Computing Routes...');
        const routesRes = await axios.post(`${API_URL}/routes/compute`, null, {
            params: { pincode: '110001', date: new Date().toISOString().split('T')[0] }
        });
        console.log(` -> Routes computed: ${routesRes.data.length} routes.`);
        
        // 4. Tracking
        console.log('\n[4] Tracking Parcel...');
        const trackRes = await axios.get(`${API_URL}/tracking/${parcelId}`);
        console.log(` -> Tracking Status: ${trackRes.data.status}`);
        
        console.log('\n--- Demo Complete: SUCCESS ---');
        
    } catch (error) {
        console.error('\n--- Demo FAILED ---');
        if (axios.isAxiosError(error)) {
             console.error(error.message);
             if (error.response) console.error(error.response.data);
        } else {
            console.error(error);
        }
    }
}

runDemo();
