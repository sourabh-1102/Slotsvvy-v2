from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import numpy as np
import os
from datetime import datetime
import json

app = FastAPI(title="SlotSavvy ML Service")

# Mock model state (replace with real model loading)
MODEL_PATH = "model.pkl"
model = None

class SlotRequest(BaseModel):
    pincode: str
    date: str
    weight: float

class SlotResponse(BaseModel):
    slot_id: str
    start: str
    end: str
    score: float
    capacity_left: int

@app.on_event("startup")
def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        # model = joblib.load(MODEL_PATH)
        print("Model loaded (stub).")
    else:
        print("No model found, using rule-based fallback.")

@app.post("/train")
def train_model():
    # Trigger training process
    # In a real app, this might run a subprocess or a background task
    return {"status": "Training started (stub)."}

@app.get("/predict_slots", response_model=List[SlotResponse])
def predict_slots(pincode: str, date: str, weight: float):
    # Rule-based fallback if no model (or even with model to filter)
    
    # 1. Define Standard Slots
    # 09:00 - 12:00, 12:00 - 15:00, 15:00 - 18:00
    base_date = datetime.strptime(date, "%Y-%m-%d")
    
    slots = []
    start_hours = [9, 12, 15]
    
    for i, h in enumerate(start_hours):
        slot_start = base_date.replace(hour=h, minute=0, second=0)
        slot_end = base_date.replace(hour=h+3, minute=0, second=0)
        
        # Rule-based scoring
        # Higher score for morning slots, lower if heavy weight in afternoon (stub logic)
        score = 0.9 - (i * 0.1) 
        if weight > 5.0 and h >= 15:
            score -= 0.2
            
        # Capacity (stub random)
        capacity = 10 - (i * 2) 
        
        slots.append({
            "slot_id": f"s-{h}",
            "start": slot_start.isoformat() + "Z", # Adding Z for UTC/ISO
            "end": slot_end.isoformat() + "Z",
            "score": round(max(0.1, score), 2),
            "capacity_left": max(0, capacity)
        })
        
    # Sort by score descending
    slots.sort(key=lambda x: x["score"], reverse=True)
    
    return slots

class RouteRequest(BaseModel):
    date: str
    pincode: str
    # parsing parcels etc can be complex, for MVP we might just take date/pincode and fetch from DB or receive list
    parcels: List[dict]

@app.post("/compute_routes")
def compute_routes(req: RouteRequest):
    # Stub for OR-Tools VRP
    # We would build distance matrix here using OSRM/ORS
    
    routes = []
    # Mock route
    route = {
        "driver_id": "d-1",
        "vehicle_id": "v-1",
        "stops": []
    }
    
    current_time = datetime.strptime(req.date + "T09:00:00", "%Y-%m-%dT%H:%M:%S")
    
    for p in req.parcels:
        travel_time = 15 # minutes stub
        arrival = current_time + timedelta(minutes=travel_time)
        departure = arrival + timedelta(minutes=5) # 5 min service
        
        route["stops"].append({
            "parcel_id": p.get("id"),
            "location": p.get("pincode"),
            "arrival_time": arrival.isoformat(),
            "departure_time": departure.isoformat()
        })
        current_time = departure
        
    routes.append(route)
    return routes

@app.get("/")
def root():
    return {"message": "ML Service is running"}
