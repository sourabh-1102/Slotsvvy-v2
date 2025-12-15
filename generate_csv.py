import csv
import random
from datetime import datetime, timedelta
import os

def generate_data(num_rows=100):
    pincodes = ['110001', '110002', '110003', '560001', '560002']
    drivers = ['d-1', 'd-2', 'd-3']
    
    base_date = datetime(2025, 1, 1)
    
    header = [
        'parcel_id','pincode','scheduled_slot_start','scheduled_slot_end',
        'scheduled_date','weight_kg','slot_load','weekday',
        'success','delivery_duration_min','driver_id','created_at'
    ]
    
    rows = []
    
    for i in range(num_rows):
        parcel_id = f"p-{i+1:03d}"
        pincode = random.choice(pincodes)
        driver_id = random.choice(drivers)
        weight_kg = round(random.uniform(0.5, 10.0), 2)
        
        # Random date within 30 days
        day_offset = random.randint(0, 30)
        date = base_date + timedelta(days=day_offset)
        weekday = date.strftime('%A')
        
        # Slots: 9-12, 12-15, 15-18
        slot_start_hour = random.choice([9, 12, 15])
        scheduled_slot_start = date.replace(hour=slot_start_hour, minute=0, second=0)
        scheduled_slot_start_iso = scheduled_slot_start.isoformat()
        
        scheduled_slot_end = scheduled_slot_start + timedelta(hours=3)
        scheduled_slot_end_iso = scheduled_slot_end.isoformat()
        
        slot_load = random.randint(0, 10) 
        
        # Success logic
        success_prob = 0.95 if slot_load < 8 else 0.70
        success = 1 if random.random() < success_prob else 0
        
        delivery_duration = random.randint(10, 45) if success else 0
        
        created_at = date - timedelta(days=random.randint(1, 5))
        created_at_iso = created_at.isoformat()
        
        rows.append([
            parcel_id, pincode, scheduled_slot_start_iso, scheduled_slot_end_iso,
            date.strftime('%Y-%m-%d'), weight_kg, slot_load, weekday,
            success, delivery_duration, driver_id, created_at_iso
        ])
        
    os.makedirs('seed', exist_ok=True)
    with open('seed/delivery_history.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(rows)
        
    print(f"Generated seed/delivery_history.csv with {num_rows} rows.")

if __name__ == '__main__':
    generate_data(150)
